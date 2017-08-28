

<!-- 效益 -->
<template>
  <div class="rating_page">
        <head-top head-title="我的优惠" go-back='true'></head-top>
        <!-- 不showloading就显示如下 -->
        <section v-if="!showLoading">
            <section class="category_title"> 
                <!-- 应该是点击之后，设置属性categoryType的值，然后带动设置class，样式被改变；也会改变后边的页面显示。 
                不需要声明事件，改变实例的数据属性 -->
                <span :class="{choosed: categoryType === 1}" @click="categoryType = 1">红包</span>
                <span :class="{choosed: categoryType === 2}" @click="categoryType = 2">商家代金券</span>
            </section>
            <!-- 红包 -->
            <transition name="router-fade">
                <section v-if="categoryType === 1">
                    <section class="hongbao_container">
                        <header class="hongbao_title">
                            <section class="total_number">
                                <!-- data内的数据可以直接饮用，不需要this -->
                                有 <span>{{hongbaoList.length}}</span> 个红包即将到期
                            </section>
                            <section class="hongbao_description">
                                <img src="../../images/description.png" height="24" width="24">
                                <router-link to="/benefit/hbDescription" class="hongbao_detail">红包说明</router-link>
                            </section>
                        </header>
                        <ul class="hongbao_list_ul">
                            <!-- v-for 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素,您需要提供一个 key 的特殊属性: -->
                            <li class="hongbao_list_li" v-for="item in hongbaoList" :key="item.id">
                                <section class="list_item">
                                    <div class="list_item_left">
                                        <span>¥</span>
                                        <!-- 直接可以使用js方法 -->
                                        <span>{{String(item.amount).split('.')[0]}}</span>
                                        <span>.</span>
                                        <span>{{String(item.amount).split('.')[1]||0}}</span>
                                        <p>{{item.description_map.sum_condition}}</p>
                                    </div>
                                    <div class="list_item_right">
                                        <h4>{{item.name}}</h4>
                                        <p>{{item.description_map.validity_periods}}</p>
                                        <p>{{item.description_map.phone}}</p>
                                    </div>
                                    <div class="time_left">{{item.description_map.validity_delta}}</div>
                                </section>
                                <footer class="list_item_footer" v-if="item.limit_map">
                                    <p>{{item.limit_map.restaurant_flavor_ids}}</p>
                                </footer>
                            </li>
                        </ul>
                    </section>
                    <!-- a标签嵌套 -->
                    <router-link to="/benefit/hbHistory" class="history_hongbao">
                        <span class="check_history">查看历史红包</span>
                        <svg class="history_right">
                        <!-- use元素在SVG文档内取得目标节点，并在别的地方复制它们。它的效果等同于这些节点被深克隆到一个不可见的DOM中，然后将其粘贴到use元素的位置，很像HTML5中的克隆模板元素。 -->
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </router-link>
                    <footer class="hongbao_footer">
                        <router-link to="/benefit/exchange" class="hongbao_style" style="border-right: 1px solid #f5f5f5">
                            兑换红包
                        </router-link>
                        <router-link to="/benefit/commend" class="hongbao_style">
                            推荐有奖
                        </router-link>
                    </footer>
                </section>
            </transition>
            <!-- 商家代金券 -->
            <transition name="router-fade">
                <section v-if="categoryType === 2" class="voucher_container">
                    <section class="hongbao_description voucher_header">
                        <img src="../../images/description.png" height="24" width="24">
                        <router-link to="/benefit/coupon" class="hongbao_detail">商家代金券说明</router-link>
                    </section>
                    <section class="unable_use">
                        <img src="../../images/voucher.png" height="170" width="300">
                        <p>无法使用代金券</p>
                        <p>非客户端或客户端版本过低</p>
                        <router-link to="/download" class="download_app">
                        下载或升级客户端
                        </router-link>
                    </section>
                </section>
            </transition>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <loading v-show="showLoading"></loading>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {mapState, mapMutations} from 'vuex'
    import {getHongbaoNum} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    import loading from 'src/components/common/loading'

    export default {
        // 本页面的基本配置，明确父组件与子组件是不同的Vue实例
      data(){
            return{
                showAlert: false, //弹出框
                alertText: null, //弹出框文字
                showLoading: true, //加载动画
                hongbaoList: null, //红包列表
                categoryType: 1, //红包与商家代金券切换
            }
        },
        // 已挂载，挂在之后调用初始化方法
        mounted(){
            this.initData();
        },
        // 区分组件与路由跳转页面，组件是本页面的元素，跳转是要到下一个页面
        components: {
            headTop,
            alertTip,
            loading,
        },
        // 计算属性
        // mapState
        // https://vuex.vuejs.org/zh-cn/state.html
        // 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
        // mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是自从有了对象展开运算符（现处于 ECMASCript 提案 stage-3 阶段），我们可以极大地简化写法：
        computed: {
            // 使用对象展开运算符将此对象混入到外部对象中
            // mapState方法返回结果的展开
            ...mapState([
                'userInfo',
            ]),
        },
        methods: {
            ...mapMutations([
                'CLEAR_CART'
            ]),
            // 异步操作变为同步编程，数据操作，本质上还是异步请求，不过是改变了回调函数方式的编程
            async initData(){
                if (this.userInfo) {
                    this.hongbaoList = await getHongbaoNum(this.userInfo.user_id);
                    this.showLoading = false;
                }
            }
        },
        // userInfo改变的时候，调用初始化函数
        watch: {
            userInfo: function (value){
                this.initData();
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .rating_page{
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .category_title{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2rem;
        background-color: #fff;
        span{
            text-align: center;
            @include sc(.65rem, #333);
            padding-bottom: .2rem;
            border-bottom: 0.1rem solid #fff;
        }
        .choosed{
            border-bottom-color: $blue;
            color: $blue;
        }
    }
    .hongbao_description{
        display: flex;
        align-items: center;
        img{
            @include wh(.6rem, .6rem);
            margin-right: .2rem;
        }
        .hongbao_detail{
            color: $blue;
        }
    }
    .hongbao_container{
        padding: 0 .7rem;
        .hongbao_title{
            @include fj;
            font-size: .5rem;
            line-height: 2rem;
            .total_number{
                color: #666;
                span{
                    color: #ff5340;
                }
            }
        }
        .hongbao_list_ul{
            .hongbao_list_li{
                background: #fff url(../../images/hongbao.png) repeat-x ;
                background-size: .5rem .2rem;
                margin-bottom: 0.5rem;
                border-radius: 0.25rem;
                .list_item{
                    @include fj;
                    padding: 1rem 0.5rem .8rem;
                    .list_item_left{
                        font-size: 0;
                        border-right: 0.025rem dotted #ccc;
                        flex: 1;
                        span:nth-of-type(1){
                            @include sc(.75rem, #ff5340);
                            font-weight: bold;
                        }
                        span:nth-of-type(2){
                            @include sc(1.5rem, #ff5340);
                        }
                        span:nth-of-type(3), span:nth-of-type(4){
                            @include sc(0.8rem, #ff5340);
                            font-weight: bold;
                        }
                        p{
                            @include sc(0.4rem, #999);
                        }
                    }
                    .list_item_right{
                        flex: 2;
                        margin-left: 1.5rem;
                        h4{
                            @include sc(.7rem, #666);
                            margin-left: -.7rem;
                        }
                        p{
                            list-style-type: disc;
                            margin-left: -.7rem;
                            @include sc(.4rem, #999);   
                        }
                    }
                    .time_left{
                        @include sc(.75rem, #ff5340);
                    }
                }
                .list_item_footer{
                    background-color: #f9f9f9;
                    padding: .4rem .4rem;
                    border-bottom-left-radius: 0.25rem;
                    border-bottom-right-radius: 0.25rem;
                    p{
                        list-style-type: disc;
                        @include sc(.4rem, #999);
                        margin-left: .4rem;
                    }
                }
            }
        }
    }
    .history_hongbao{
        padding: .5rem 0 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .check_history{
            @include sc(.5rem, #999);
            margin-right: .2rem;
        }
        .history_right{
            @include wh(.4rem, .4rem);
            fill: #aaa;
        }
    }
    .hongbao_footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        display: flex;
        .hongbao_style{
            flex: 1;
            line-height: 2rem;
            text-align: center;
            @include sc(.7rem, #555);
        }
    }
    .voucher_container{
        .voucher_header{
            font-size: .5rem;
            justify-content: flex-end;
            line-height: 2rem;
            margin-right: .5rem;
        }
        .unable_use{
            text-align: center;
            margin-top: 4rem;
            img{
                @include wh(6rem, 3.4rem);
            }
            p:nth-of-type(1){
                @include sc(.7rem, #666);
                margin-top: .4rem;
            }
            p:nth-of-type(2){
                @include sc(.5rem, #999);
                margin-top: .3rem;
                margin-bottom: .3rem;
            }
            .download_app{
                background-color: #56d176;
                @include sc(.65rem, #fff);
                padding: .3rem;
                border-radius: .15rem;
            }
        }
    }
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
