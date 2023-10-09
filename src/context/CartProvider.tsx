export type CartItemType = {
	sku: string
	name: string
	price: number
	qty: number
}

type CartStateType = {
	cart: CartItemType[]
}

const initCartState: CartStateType = {
	cart: [],
}

const REDUCER_ACTION_TYPE = {
	ADD: 'ADD',
	REMOVE: 'REMOVE',
	QUANTITY: 'QUANTITY',
	SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
	type: string
	payload?: CartItemType
}

const reducer = (
	state: CartStateType,
	action: ReducerAction
): CartStateType => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.ADD: {
			if (!action.payload) {
				throw new Error('action.payload is missing in ADD action')
			}
			//destructure action payload
			const { sku, name, price } = action.payload
			console.log(action.payload) //27:47
			const filteredCart: CartItemType[] | undefined = state.cart.filter(
				item => item.sku !== sku
			)
			const itemExists: CartItemType | undefined = state.cart.find(
				item => item.sku === sku
			)
			const qty: number = itemExists ? itemExists.qty + 1 : 1
			return {
				...state,
				cart: [...filteredCart, { sku, name, price, qty }],
			}
		}

		case REDUCER_ACTION_TYPE.REMOVE: {
			if (!action.payload) {
				throw new Error('action.payload is missing in REMOVE action')
			}
			const { sku } = action.payload
			console.log(action.payload)
			const filteredCart: CartItemType[] | undefined = state.cart.filter(
				item => item.sku === sku
			)
			return { ...state, cart: [...filteredCart] }
		}

		case REDUCER_ACTION_TYPE.QUANTITY: {
			if (!action.payload) {
				throw new Error('action.payload is missing in QUANTITY action')
			}
			const { sku, qty } = action.payload
			console.log(action.payload) //27:47
			const itemExists: CartItemType | undefined = state.cart.find(
				item => item.sku === sku
			)

			if (!itemExists) {
				throw new Error('Item needs to be in cart to change quantity')
			}
			const updatedItem: CartItemType = { ...itemExists, qty }
			const filteredCart: CartItemType[] = state.cart.filter(
				item => item.sku !== sku
			)

			return {
				...state,
				cart: [...filteredCart, updatedItem],
			}
		}

		case REDUCER_ACTION_TYPE.SUBMIT: {
			return { ...state, cart: [] }
		}
		default:
			throw new Error('Not a valid reducer action type')
	}
}
