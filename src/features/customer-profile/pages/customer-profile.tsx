import React from 'react'

import { Helmet } from 'react-helmet-async'

import { useAuthContext } from '@/context/auth-context'

import { Button } from '@/components/ui/button'

function CustomerProfile() {
    const { authUser } = useAuthContext()

    return (
        <React.Fragment>
            <Helmet>
                <title>Thông tin cá nhân</title>
            </Helmet>
            <h1 className="text-2xl font-semibold">Thông tin cá nhân</h1>

            <div className="mt-4 bg-[#fff] rounded-xl w-full">
                <div className="py-6 px-4 flex flex-col items-center justify-center gap-3">
                    <img
                        src={authUser.avatar}
                        alt=""
                        className="size-[100px] rounded-full"
                    />

                    <div className="flex flex-col gap-4 py-2 w-[350px] justify-between">
                        <div className="flex justify-between border-b border-solid border-b-[1] pb-3">
                            <p className="text-[#74728c]">Họ và tên</p>
                            <p className="font-semibold">{authUser.fullName}</p>
                        </div>
                        <div className="flex justify-between border-b border-solid border-b-[1] pb-3">
                            <p className="text-[#74728c]">Email</p>
                            <p className="font-semibold">{authUser.email}</p>
                        </div>
                        <div className="flex justify-between border-b border-solid border-b-[1] pb-3">
                            <p className="text-[#74728c]">Số điện thoại</p>
                            <p className="font-semibold">{authUser.phone}</p>
                        </div>
                    </div>
                    <Button>Chỉnh sửa thông tin</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CustomerProfile
