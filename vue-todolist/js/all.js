var app = new Vue({
    el: '#todolist',
    data: {
      newTodo:'',
      todos:[],
      visibility:'all',
      catchTodo:{},
      catchTitle:'',
    },
    methods:{
        addTodo : function(){
            var value = this.newTodo.trim();
            var newNumber = Math.floor(new Date());
            if(!value){
                return;
            }
            this.todos.push({
                id:newNumber,
                title:value,
                completed:false
            });
            this.newTodo ='';
        },
        removeTodo : function(todo){
            var newIndex = '';
            var vm = this;
            vm.todos.forEach(function(item, key){
                if(todo.id === item.id){
                    newIndex = key;
                }
            })
            this.todos.splice(newIndex,1);
        },
        editTodo : function(item){
            console.log(item);
           this.catchTodo = item;
           this.catchTitle = item.title;
        },
        cancelTodo : function(){
            this.catchTodo = {};
        },
        saveTodo : function(item){
            item.title = this.catchTitle;
            this.catchTitle = '';
            this.catchTodo = {};
        },
        removeAll : function(){
            this.todos = [];
        }
    },
    computed:{
        filterTodo: function(){
            if(this.visibility == 'all'){
                return this.todos;
            }else if(this.visibility == 'active'){
                var newTodos = [];
                this.todos.forEach(function(item){
                    if(!item.completed){
                        newTodos.push(item);
                    }
                })
                return newTodos;
            }else if(this.visibility == 'completed'){
                var newTodos = [];
                this.todos.forEach(function(item){
                    if(item.completed){
                        newTodos.push(item);
                    }
                })
                return newTodos;
            }
        },
        todoCount : function(){
            var todoAmount = [];
            this.todos.forEach(function(item){
                if(!item.completed){
                    todoAmount.push(item);
                }
            })
            return todoAmount.length;
        }
    }
})
