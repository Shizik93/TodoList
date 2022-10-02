import {instance} from "./axios/axiosInstance";

export const todoApi = {
    fetchTodolists: () => {
        return instance.get('/todo-lists').then(res => res.data)
    },
    createNewTodolist: (title: string) => {
        return instance.post('/todo-lists', {title}).then(res => res.data)
    },
    updateTodolist: (title: string, id: string) => {
        return instance.put(`/todo-lists/${id}`, {title}).then(res => res.data)

    },
    deleteTodolist: (id: string) => {
        return instance.delete(`/todo-lists/${id}`)
    }

}
