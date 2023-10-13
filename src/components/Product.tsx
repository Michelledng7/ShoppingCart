import { ReducerActionType, ReducerAction } from '../context/CartProvider'
import { ProductType } from '../context/ProductsProvider'
import { ReactElement, memo } from 'react'

type PropsType = {
	product: ProductType
	dispatch: React.Dispatch<ReducerAction>
	REDUCER_ACTIONS: ReducerActionType
	inCart: boolean
}

const Product = ({
	product,
	dispatch,
	REDUCER_ACTIONS,
	inCart,
}: PropsType): ReactElement => {
	const img: string = new URL(`../images/${product.sku}.webp`, import.meta.url)
		.href //to get the string value of the URL object
	console.log(img)

	const onAddToCart = () => {
		dispatch({
			type: REDUCER_ACTIONS.ADD,
			payload: { ...product, qty: 1 },
		})
	}

	const itemInCart = inCart ? '→ Item in Cart: ✔️' : null //emoji is a unicode character

	const content = (
		<article className='product'>
			<h3>{product.name}</h3>
			<img src={img} alt={product.name} className='product__img' />
			<p>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'AUD',
				}).format(product.price)}
				{itemInCart}
			</p>
			<button onClick={onAddToCart}>Add item to Cart</button>
		</article>
	)

	return content
}

export default Product
