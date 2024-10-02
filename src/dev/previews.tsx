import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import BrandDashboard from '@/features/brand/pages/BrandDashboard.tsx'

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path="/BrandDashboard">
                <BrandDashboard />
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews