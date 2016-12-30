/**
 * 使用Vue的过程就是定义MVVM各个组成部分的过程的过程。
    1、定义View
    2、定义Model
    3、创建一个Vue实例或"ViewModel"，它用于连接View和Model
    在创建Vue实例时，需要传入一个选项对象，
    选项对象可以包含数据、挂载元素、方法、模生命周期钩子等等。
 */   

// 声明式渲染
var app_declare = new Vue({
  el: '#app-1',
  data: {
    message: 'Hello Vue!'
  }
});
// 这是我们的Model, 这里的model是一个全局的变量，可以在控制台上来控制里边的属性。
var exampleData = {
    message: 'Hello World!',
    message2: 'nihao shijie!'
};
// 创建一个 Vue 实例或 "ViewModel"  它连接 View 与 Model
new Vue({
    el: '#app-model',
    data: exampleData
});
// v-bind  添加标签属性
var app3 = new Vue({
  el: '#app-3',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})
// 你再次打开浏览器的控制台输入 app2.message = 'some new message'，你就会再一次看到这个绑定了title属性的HTML已经进行了更新。
// v-if指令
var vm_if = new Vue({
    el: '#app-if',
    data: {
        yes: true,
        no: false,
        age: 28,
        name: 'keepfool'
    }
});
// v-for
var vm_for = new Vue({
    el: '#app-for',
    data: {
        people: [{    //在data中定义对象属性-->数组
            name: 'Jack',
            age: 30,
            sex: 'Male'
        }, {
            name: 'Bill',
            age: 26,
            sex: 'Male'
        }, {
            name: 'Tracy',
            age: 22,
            sex: 'Female'
        }, {
            name: 'Chris',
            age: 36,
            sex: 'Male'
        }]
    }
});
// v-on  用于绑定事件
var vm_on = new Vue({
    el: '#app-on',
    data: {
        message: 'Hello, Vue.js!'
    },
    // 在methods对象中定义方法,自定义函数处理回调方法
    methods: {
        greet: function() {
            this.message = this.message.split('').reverse().join('');
            // 方法内 this 指向 vm
            alert(this.message)
        },
        say: function(msg) {
            alert(this.message + " ： "+msg)
        }
    }
});
// Vue component
// 我们已经将应用分割成了两个更小的单元，子元素通过 props 接口实现了与父亲元素很好的解耦。
// 我们现在可以在不影响到父应用的基础上，进一步为我们的 todo 组件改进更多复杂的模板和逻辑。
// 整个模板的工作流程也就是：从Vue对象中拿到参数，依据组件规则将元素填到页面中
Vue.component('todo-item', {// 组件名称todo-item
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],//下边模板中的参数对象，这个参数又是从v-bind给绑定的，这个值有来自于Vue对象
  template: '<li>{{ todo.text }}</li>'
})
var vm_component = new Vue({
  el: '#app-component',
  data: {// 使用for循环将下面的参数依次绑定到了标签内
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
// filter
new Vue({
    el : '#filter',
    data : {
        products : [
            {name: 'microphone', price: 25, category: 'electronics'},
            {name: 'laptop case', price: 15, category: 'accessories'},
            {name: 'screen cleaner', price: 17, category: 'accessories'},
            {name: 'laptop charger', price: 70, category: 'electronics'},
            {name: 'mouse', price: 40, category: 'electronics'},
            {name: 'earphones', price: 20, category: 'electronics'},
            {name: 'monitor', price: 120, category: 'electronics'}
        ]
    },
    filters: {
        discount : function(value, discount){
            return value * ( discount / 100 );
        }
    }
});
// computed
var vm = new Vue({
    el: '#computed',
    data: {
        message: 'Hello'
    },
    computed: {//表明属性是由计算得到的
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    },
    // in component
    methods: {// 计算属性是基于它的依赖缓存
        reverseMessageMethods: function () {
            return this.message.split('').reverse().join('')
        }
    }
})
// watched setter
var vm_watch = new Vue({
  el: '#watched',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  },
  computed: {
        fullName2: {
            // getter
            get: function () {
              return this.firstName + ' ' + this.lastName
            },
            // setter   vm_watch.fullName2 = 'John Doe'
            set: function (newValue) { 
              var names = newValue.split(' ')
              this.firstName = names[0]
              this.lastName = names[names.length - 1]
            }
        }  
    }
})
// v-show
var vm_show = new Vue({
    el: '#app-show',
    data: {
        yes: true,
        no: false,
        age: 28,
        name: 'keepfool',
        sex:'male'
    }
});
// component
var todo_list_complete = new Vue({
    el:'#todo-list-complete',
    data:{          //这里就像当于react中的react
        newTodo:'',
        todos:[
            { text:'Add some todos' }
        ]
    },
    methods:{
        addTodo:function(){ //这里是使用构造函数生成的一个对象实例
            var text = this.newTodo.trim();
            if(text){
                this.todos.push({ text:text })
                this.newTodo = ''
            }
        },
        removeTodo: function (index) {
          this.todos.splice(index, 1)//移除目标数组中的删除选项，借助于  $index
        }
    }
})
// v-on add
var example1 = new Vue({
  el: '#on-add',
  data: {
    counter: 0
  }
})





var vms_for = new Vue({
    el:'#org_for',
    data:{
        knowledges:[
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue.js' },
            { text: 'Build Something Awesome' }]
    }
});



var testData = {
    testDetai:"testSelect"
};
new Vue({
    el: '#test',
    data: testData
});





 
var org_on = new Vue({
	el:'#org_on',
	data:{
		message:'hello Vue.jsthis.messathis.messathis.messathis.messathis.messathis.messathis.messathis.messag'
	},
	methods:{
		reverseMessage:function(event){
			this.message = this.message.split('').reverse().join('');
			console.log(event);
		}
	}
});





     

	// vm_if.age = 24
// 24
// vm_if.age = 25
// 25


var vm_bind = new Vue({
    el: '#_bind',
    data: {
        activeNumber: 2,  //更改activity的值以使当前的活动对象改变
        pageCount: 10
    }
});

// 综合案例
var vm_complete = new Vue({
    el: '#_complete',
    data: {
        newPerson: {
            name: '',
            age: 0,
            sex: 'Male'
        },
        people: [{
            name: 'Jack',
            age: 30,
            sex: 'Male'
        }, {
            name: 'Bill',
            age: 26,
            sex: 'Male'
        }, {
            name: 'Tracy',
            age: 22,
            sex: 'Female'
        }, {
            name: 'Chris',
            age: 36,
            sex: 'Male'
        }]
    },
    methods:{
        createPerson: function(){
            this.people.push(this.newPerson);
            // 添加完newPerson对象后，重置newPerson对象
            this.newPerson = {name: '', age: 0, sex: 'Male'}   //重置输入框
        },
        deletePerson: function(index){
            // 删一个数组元素
            this.people.splice(index,1);
        },
        detail:function(arg){//打印当前对象
        	console.log(event);
        	console.log(arg);
        	console.log(this);
        }
    }
});
//WHY?
// var extendVue = Vue.extend({
// 	created:function(str){
// 		console.log("this is a extend Vue Object!");
// 		console.log(str);
// 	}
	
// 	// data:{
// 	// 	atr:"sdfsdfd"
// 	// }
// });
// var myVueObject = new extendVue();

// console.log(myVueObject.atr);


// var textAttr = new Vue({

// });
