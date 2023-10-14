import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'
import { ReactElement, ChangeEvent, memo } from 'react'

type PropsType = {
	item: CartItemType
	dispatch: React.Dispatch<ReducerAction>
	REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
	const img: string = new URL(`../images/${item.sku}.webp`, import.meta.url)
		.href
	console.log(img)

	const lineTotal: number = item.price * item.qty

	const highestQty: number = 20 > item.qty ? 20 : item.qty

	const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

	const options: ReactElement[] = optionValues.map(val => {
		return (
			<option key={`opt${val}`} value={val}>
				{val}
			</option>
		)
	})

	const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: REDUCER_ACTIONS.QUANTITY,
			payload: { ...item, qty: Number(e.target.value) },
		})
	}

	const onRemoveFromCart = () =>
		dispatch({
			type: REDUCER_ACTIONS.REMOVE,
			payload: item,
		})

	const content = (
		<li className='cart__item'>
			<img src={img} alt={item.name} className='cart__img' />
			<div aria-label='item Name'>{item.name}</div>
			<div aria-label='Price Per Item'>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'AUD',
				}).format(item.price)}
			</div>

			<label htmlFor='itemQty' className='offscreen'>
				Item Quantity
			</label>

			<select
				name='itemQty'
				id='itemQty'
				className='cart__select'
				value={item.qty}
				aria-label='Item Quantity'
				onChange={onChangeQty}
			>
				{options}
			</select>

			<div className='cart__item-subtotal' aria-label='Line Item Subtotal'>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'AUD',
				}).format(lineTotal)}
			</div>

			<button
				className='cart__button'
				aria-label='Remove Item from Cart'
				title='Remove Item from Cart'
				onClick={onRemoveFromCart}
			>
				Remove
			</button>
		</li>
	)

	return content
}

function areItemsEqual(
	{ item: prevItem }: PropsType,
	{ item: nextItem }: PropsType
) {
	return Object.keys(prevItem).every(key => {
		return (
			prevItem[key as keyof CartItemType] ===
			nextItem[key as keyof CartItemType]
		)
	})
}
const MemoizedCartLineItem = memo<typeof CartLineItem>(
	CartLineItem,
	areItemsEqual
)

export default MemoizedCartLineItem
