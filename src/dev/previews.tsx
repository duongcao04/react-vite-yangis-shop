import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import BrandDashboard from '@/features/brand/pages/BrandDashboard.tsx'
import ProductDashboard from '@/features/product/pages/ProductDashboard.tsx'
import App from '@/App.tsx'

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path="/BrandDashboard">
                <BrandDashboard />
            </ComponentPreview>
            <ComponentPreview path="/ProductDashboard">
                <ProductDashboard />
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App />
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews