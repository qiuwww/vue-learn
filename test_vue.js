
// 声明式渲染
var app_declare = new Vue({
  el: '#app_declare',
  data: {
    message: 'Hello Vue!'
  }
});


// 就近原则,org
var org_complete = new Vue({
	el:'#org_complete',
	data:{			//这里就像当于react中的react
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

var org_for = new Vue({
	el:'#org_for',
	data:{
		knowledges:[
		    { text: 'Learn JavaScript' },
				{ text: 'Learn Vue.js' },
				{ text: 'Build Something Awesome' }]
	}
});


// 这是我们的Model, 这里的model是一个全局的变量，可以在控制台上来控制里边的属性。
var exampleData = {
    message: 'Hello World!',
    message2: 'nihao shijie!'
};
var testData = {
	testDetai:"testSelect"
};




// 创建一个 Vue 实例或 "ViewModel"
// 它连接 View 与 Model

new Vue({
    el: '#app',
    data: exampleData
});

new Vue({
	el: '#test',
	data: testData
});
/**
 * 使用Vue的过程就是定义MVVM各个组成部分的过程的过程。
	1、定义View
	2、定义Model
	3、创建一个Vue实例或"ViewModel"，它用于连接View和Model
	在创建Vue实例时，需要传入一个选项对象，选项对象可以包含数据、挂载元素、方法、模生命周期钩子等等。

	在这个示例中，选项对象的el属性指向View，el: '#app'表示该Vue实例将挂载到<div id="app">...</div>这个元素；data属性指向Model，data: exampleData表示我们的Model是exampleData对象。
	Vue.js有多种数据绑定的语法，最基础的形式是文本插值，使用一对大括号语法，在运行时{{ message }}会被数据对象的message属性替换，所以页面上会输出"Hello World!"。
 */        
var vm_if = new Vue({
    el: '#_if',
    data: {
        yes: true,
        no: false,
        age: 28,
        name: 'keepfool'
    }
});
	// vm_if.age = 24
// 24
// vm_if.age = 25
// 25
var vm_show = new Vue({
    el: '#_show',
    data: {
        yes: true,
        no: false,
        age: 28,
        name: 'keepfool',
        sex:'male'
    }
});
var vm_for = new Vue({
    el: '#_for',
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
var vm_bind = new Vue({
    el: '#_bind',
    data: {
        activeNumber: 2,  //更改activity的值以使当前的活动对象改变
        pageCount: 10
    }
});
var vm_on = new Vue({
    el: '#_on',
    data: {
        message: 'Hello, Vue.js!'
    },
    // 在 `methods` 对象中定义方法,自定义函数处理回调方法
    methods: {
        greet: function() {
            // // 方法内 `this` 指向 vm
            alert(this.message)
        },
        say: function(msg) {
            alert(this.message + "    "+msg)
        }
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
