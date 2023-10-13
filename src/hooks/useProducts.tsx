import { useContext } from 'react'
import ProductsContext from '../context/ProductsProvider'
import { UseProductsContextType } from '../context/ProductsProvider'

const useProduct = (): UseProductsContextType => {
	return useContext(ProductsContext)
}
export default useProduct
