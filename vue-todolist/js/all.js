var toDoList = new Vue({
    el:'.todolist',
    data:{
        todos:[],
        newTodo:'',
        options:['All','Active','Completed'],
        currentOption:'All'
    },
    methods:{
        addToDo: function(todo){
            this.todos.push({content:todo,completed:false})
        },
        removeToDo: function(todo){
            this.todos.splice(this.todos.indexOf(todo),1)
        },
        removeAll: function(){
            this.todos.splice(this.todos)
        }
    }
});

   