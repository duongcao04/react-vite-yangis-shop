import { useCallback, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { IoCloseCircle, IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { config } from '@/config'

interface ISearchbarProps {
    isExtendSearchbar: boolean
    setIsExtendSearchbar: React.Dispatch<React.SetStateAction<boolean>>
}

function Searchbar({
    isExtendSearchbar,
    setIsExtendSearchbar,
}: ISearchbarProps) {
    const navigate = useNavigate()
    const [searchKey, setSearchKey] = useState<string>('')

    const handleSearch = () => {
        navigate(`${config.routes.products}?tim_kiem=${searchKey}`)
        setIsExtendSearchbar(false)
        setSearchKey('')
    }

    // Motion variants
    const searchbar = {
        narrow: { opacity: 1, width: '44px' },
        extend: { opacity: 1, width: '680px' },
    }
    const input = {
        narrow: { display: 'none', width: 0 },
        extend: { display: 'block', width: '100%', paddingLeft: '10px' },
    }

    const handleUserKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const { key } = event
            if (key === 'Escape') {
                setIsExtendSearchbar(false)
                setSearchKey('')
            }
        },
        [setIsExtendSearchbar]
    )

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress)
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress)
        }
    }, [handleUserKeyPress])

    return (
        <div className="flex items-center justify-end">
            <motion.div
                initial={searchbar.narrow}
                animate={isExtendSearchbar ? 'extend' : 'narrow'}
                variants={searchbar}
                className={`relative p-[6px] text-black flex items-center justify-end bg-white rounded-full over`}
            >
                <motion.form
                    initial={input.narrow}
                    animate={isExtendSearchbar ? input.extend : input.narrow}
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleSearch()
                    }}
                >
                    <motion.input
                        initial={input.narrow}
                        animate={
                            isExtendSearchbar ? input.extend : input.narrow
                        }
                        variants={input}
                        type="text"
                        className="text-[14px] focus:outline-none leading-[32px]"
                        placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
                        autoComplete="off"
                        name="search"
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                        }}
                    />
                </motion.form>
                {searchKey && (
                    <button
                        className="mr-3 hover:scale-125 transition duration-200"
                        title="Đóng"
                        onClick={() => {
                            setSearchKey('')
                        }}
                    >
                        <IoCloseCircle size={20} />
                    </button>
                )}
                <button
                    className={`size-[32px] rounded-full grid place-items-center text-[#dc2626] transition duration-300`}
                    title="Tìm kiếm"
                    onClick={() => {
                        if (searchKey !== '') {
                            handleSearch()
                        } else {
                            setIsExtendSearchbar(!isExtendSearchbar)
                        }
                    }}
                >
                    <IoSearch size={20} />
                </button>
            </motion.div>
        </div>
    )
}

export default Searchbar
