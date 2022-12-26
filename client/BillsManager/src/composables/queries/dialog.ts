import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export function useDialog() {
	return useQuery(['dialog'], () => false)
}

export function useUpdateDialog() {
	const { setQueryData } = useQueryClient()
	return useMutation({
		mutationFn: async () => {
			setQueryData<boolean>(['dialog'], (oldData) => !oldData)
		},
	})
}
