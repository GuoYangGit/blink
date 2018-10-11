# 关于微信小程序的学习总结

> 引言:微信小程序的开发文档[点我](https://developers.weixin.qq.com/miniprogram/dev/index.html)

## 基础知识  

1. **小程序的文件类型**  

    | 描述 | 小程序 | 前端 |
    |---|---|---|
    | 样式 | wxss | css |
    | 骨架 | wxml | html |
    | 业务 | js | js |
    | 配置 | json | - |

2. **小程序开发规范**  

    - **WXML规范**

        `wxml` 标签可以单独出现的情况，尽量单独出现，如`<input />`。

    - **注释规范**  

        除组件外的其他块级元素，均需注释出其功能，并在其上下空出一行与其他代码进行区分。  

        ```xml
        <view>...</view>

        <!-- 导航栏 -->
        <view>...</view>

        <view>...</view>
        ```

    - **CSS规范**  

        在开发过程中 `rpx` 和 `px` 均可能用到，如通常情况下间距使用 `rpx` ，字体大小和边框等使用 `px` ，开发者根据实际情况而定。  

        ```css
        width: 100rpx;
        font-size: 14px;
        ```
        `CSS` 代码需有明显的代码缩进。每一个样式类之间空出一行。  
        ```css
        .v-tag{
        width: 100%;
        }

        .v-container{
        width: 100%;
        }
        ```
        尽量使用简写属性，并且同一属性放置在一起，避免散乱。  

        ```css
        /**使用简写属性**/
        .v-image{
        margin: 0 auto;
        }

        /**同一属性放在一块**/
        .v-tag{
        margin-left: 10rpx;
        margin-right: 10rpx
        }
        ```

        采用 `flex` 进行布局，禁止使用 `float` 以及 `vertical-align` 。 

        ```css
        .container{
        disaplay: flex;
        flex-dirextion: row
        }
        ```

    - **JS规范**

        - **命名规范**

            变量名以及函数名统一采用驼峰命名法，正常情况下函数名前缀需加上清晰的动词表示函数功能，私有函数或者属性以下划线开头表明。常量需用 `const` 声明。
            类的命名首字母需大写。
            采用*ES6*关键字 `let` 定义变量，尽量不使用 `var`   

            ```js
            //定义常量
            const a = 1

            //定义变量
            let imageContent =  res.data

            //函数命名
            getInfo:function(){
            return '';
            }

            //私有函数
            _getInfo:function(){
            return '';
            }
            ```

        - **回调函数规范**

            回调函数统一使用 `Promise` 函数的方式进行编写，回调成功的参数统一为 `res` ，错误参数为 `err`。  

            ```js
            // promise 处理回调
            let back = new Promise((resolve, reject) => {
            if (/* 异步操作成功 */){
                resolve(value);
            } else {
                reject(error);
            }
            });

            back.then((res) => {
                console.log('成功回调！', res);
            }).catch((err) => {
                console.log('失败回调！', error);
            });
            ```

            私有函数以及回调函数统一放置在生命周期函数后。  
            删除 `js` 文件中未用到的生命周期函数，保持代码的整洁。

        - **数据绑定变量定义规范**

            所有涉及到数据绑定的变量均需在 `data` 中初始化。禁止在不定义的情况下直接 `setData` 。  

            ```js
            Pages({
                data:{
                    id : null
                },
                
                onLoad:function(event){
                    let id = event.target.dataset.id
                    this.data.id = id
                }
            })
            ```

        - **点击事件规范**

            点击事件函数命名方式为 `on` + 事件名 或者业务名。

            ```js
            onLike: function(event){
            }
            //或者
            onLike(event){
            }
            ```

    - **组件规范**

        - **组件名命名规范**

            组件在使用时命名以 `v-` 为开头的组件名，若组件名称为多个单词名拼接而成，采用 `-` 连接。组件标签在 `page` 页面使用时推荐使用单闭合标签（此条约束对于包含有 `slot` 的组件无效）  

            ```xml
            <v-movies />
            ```

        - **触发事件规范**

            组件点击触发事件建议用冒号分隔开  

            ```xml
            <v-component-tag-name bind:myevent="onMyEvent" />
            ```

        - **externalClasses外部样式命名规范**
            命名格式采用如下形式：v-class-{name}，name可自行定义  

            ```xml
            v-class-icon
            ```
    
    - **标点规范**

        *JS*语句无需以分号结束，统一省略分号。
        *JS*中一致使用反引号 `` 或单引号 ' ' , 不使用双引号。
        *WXML*、*CSS*、*JSON*中均应使用双引号。
        *CSS*属性中冒号中后面用一个空格分隔开。

## 布局

- **flex**
    
    - **简介**

        Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

    - **示例代码和属性说明**

        ```xml
        <!-- 指定布局方式为flex -->
        display: flex;
        <!-- 指定其排列方式 -->
        <!-- row:横向-从左到右 -->
        <!-- row-reverse:横向-从右到左 -->
        <!-- column:纵向-从上到下 -->
        <!-- column-reverse:纵向-从下到上 -->
        flex-direction: row | row-reverse | column | column-reverse;
        <!-- 进行换行属性 -->
        <!-- nowrap(默认):不换行 -->
        <!-- wrap:换行,第一行在上方 -->
        <!-- wrap-reverse:换行,第一行在下方 -->
        flex-wrap: nowrap | wrap | wrap-reverse;
        <!-- flex-flow属性是flex-direction属性和flex-wrap属性的简写形式,默认值为row nowrap -->
        flex-flow: <flex-direction> || <flex-wrap>;
        <!-- 主轴上的对齐方式 -->
        <!-- flex-start(默认值):左对齐 -->
        <!-- flex-end:右对齐 -->
        <!-- center:居中 -->
        <!-- space-between:两端对齐，项目之间的间隔都相等 -->
        <!-- space-around:每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。 -->
        justify-content: flex-start | flex-end | center | space-between | space-around;
        <!-- 交叉轴上对齐方式 -->
        <!-- flex-start:交叉轴的起点对齐 -->
        <!-- flex-end:交叉轴的终点对齐 -->
        <!-- center:交叉轴的中点对齐 -->
        <!-- baseline:项目的第一行文字的基线对齐 -->
        <!-- stretch(默认值):如果项目未设置高度或设为auto，将占满整个容器的高度 -->
        align-items: flex-start | flex-end | center | baseline | stretch;
        <!-- 多根轴线的对齐方式 -->
        <!-- flex-start:与交叉轴的起点对齐 -->
        <!-- flex-end:与交叉轴的终点对齐 -->
        <!-- center:与交叉轴的中点对齐 -->
        <!-- space-between:与交叉轴两端对齐，轴线之间的间隔平均分布 -->
        <!-- space-around:每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍 -->
        <!-- stretch(默认值):轴线占满整个交叉轴 -->
        align-content: flex-start | flex-end | center | space-between | space-around | stretch;
        ```

## 组件(Component)

1. **概述**

    开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。

2. **创建自定义组件**

    类似于页面，一个自定义组件由 `json` `wxml` `wxss` `js` 4个文件组成。要编写一个自定义组件，首先需要在 `json` 文件中进行自定义组件声明(将 `component` 字段设为 `true` 可这一组文件设为自定义组件)

    ```json
    {
        "component": true
    }
    ```

3. **组件模版和样式**

    >类似于页面，自定义组件拥有自己的 `wxml` 模版和 `wxss` 样式。  

    - **组件wxml的slot**

        在组件的`wxml`中可以包含 `slot` 节点，用于承载组件使用者提供的`wxml`结构。

        默认情况下，一个组件的`wxml`中只能有一个`slot`。需要使用多`slot`时，可以在组件`js`中声明启用。  

        ```js
        Component({
            options: {
                multipleSlots: true // 在组件定义时的选项中启用多slot支持
            },
        })
        ```

        此时，可以在这个组件的`wxml`中使用多个`slot`，以不同的 `name` 来区分。  

        ```xml
        <!-- 组件模板 -->
        <view class="wrapper">
            <slot name="before"></slot>
            <view>这里是组件的内部细节</view>
            <slot name="after"></slot>
        </view>
        ```

        使用时，用 `slot` 属性来将节点插入到不同的`slot`上。

        ```xml
        <!-- 引用组件的页面模版 -->
        <view>
            <component-tag-name>
                <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
                <view slot="before">这里是插入到组件slot name="before"中的内容</view>
                <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
                <view slot="after">这里是插入到组件slot name="after"中的内容</view>
            </component-tag-name>
        </view>
        ```

    - **外部样式类**

        有时，组件希望接受外部传入的样式类（类似于 `view` 组件的 `hover-class` 属性）。此时可以在 `Component` 中用 `externalClasses` 定义段定义若干个外部样式类。  

        ```js
        /* 组件 custom-component.js */
        Component({
            externalClasses: ['my-class']
        })
        ```

        ```xml
        <text class="my-class">这段文本的颜色由组件外的 class 决定</text>
        ```

        这样，组件的使用者可以指定这个样式类对应的 `class` ，就像使用普通属性一样。  

        ```xml
        <!-- 页面的 WXML -->
        <v-component my-class="red-text" />
        ```

    - **组件间通信与事件**
        组件可以通过定义`properties`中的属性来从外部传入数据，
        同时可以通过事件来向父组件传递数据。  

        ```xml
        <!-- 在自定义组件中 -->
        <button bindtap="onTap">点击这个按钮将触发“myevent”事件</button>
        ```

        ```js
        Component({
            methods: {
                onTap: function(){
                var myEventDetail = {} // detail对象，提供给事件监听函数
                var myEventOption = {} // 触发事件的选项
                //triggerEvent()方法来进行事件绑定
                this.triggerEvent('myevent', myEventDetail, myEventOption)
                }
            }
        })
        ```

        这里关于触发事件的具体介绍，请阅读微信官方文档[事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)  

        然后我们就可以在父组件中来监听该事件  

        ```xml
        <!-- myevent便是我们上面设置绑定事件的名称 -->
        <v-component-name bind:myevent="onMyEvent" />
        ```

    - **Component构造器**

        具体查看[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)

        *示例代码*

        ```js
        Component({

            behaviors: [],

            properties: {
                myProperty: { // 属性名
                    type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
                    value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
                    observer: function(newVal, oldVal, changedPath) {
                        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                        // 这里我们需要注意千万不要在observer中去修改自身属性值(会引发observer函数的调用)
                    }
                },
                myProperty2: String // 简化的定义方式
            },
            data: {}, // 私有数据，可用于模版渲染

            lifetimes: {
                // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
                attached: function () { },
                moved: function () { },
                detached: function () { },
            },

            // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
            attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
            ready: function() { },

            pageLifetimes: {
                // 组件所在页面的生命周期函数
                show: function () { },
            },

            methods: {
                onMyButtonTap: function(){
                this.setData({
                    // 更新属性和数据的方法与更新页面数据的方法类似
                })
                },
                // 内部方法建议以下划线开头
                _myPrivateMethod: function(){
                // 这里将 data.A[0].B 设为 'myPrivateData'
                this.setData({
                    'A[0].B': 'myPrivateData'
                })
                },
                _propertyChange: function(newVal, oldVal) {

                }
            }

        })
        ```

        - **behaviors**

            `behaviors` 是用于组件间代码共享的特性。
            >每个 behavior 可以包含一组属性、数据、生命周期函数和方法，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。每个组件可以引用多个 behavior 。 behavior 也可以引用其他 behavior 。  

            ```js
            //定义behavior
            const beHavior = Behavior({
                behaviors: [],
                properties: {
                    myBehaviorProperty: {
                    type: String
                    }
                },
                data: {
                    myBehaviorData: {}
                },
                attached: function(){},
                methods: {
                    myBehaviorMethod: function(){}
                }
            })
            //导出behavior
            export { beHavior }
            ```
            组建中使用`behavior`
            ```js
            import { beHavior } from "../.."
            Component({
                behaviors: [beHavior],
                properties: {
                    myProperty: {
                    type: String
                    }
                },
                data: {
                    myData: {}
                },
                attached: function(){},
                methods: {
                    myMethod: function(){}
                }
            })
            ```

            **字段的覆盖**

            组件和它引用的 `behavior` 中可以包含同名的字段，对这些字段的处理方法如下：
            1. 组件本身的属性和方法会覆盖 `behavior` 的属性和方法，如果引用了多个 `behavior` ，在定义段中后面的 `behavior` 会覆盖前面 `behavior` 重复的属性和方法。
            2. 同名的数据字段，数据是对象类型，会进行对象合并，非对象类型则会进行相互覆盖
            3. 生命周期函数不会相互覆盖，而是在对应触发时机被逐个调用

        - **observer**

            属性被改变时执行的函数
        
            ```js
            Component({
                properties: {
                    myProperty: { 
                        type: String,
                        observer: function(newVal, oldVal, changedPath) {
                        }
                    },
                },
            }
            ```

            > 这里我们需要注意千万不要在observer中去修改自身属性值(会引发observer函数的调用)

        - **关于组件的显示隐藏**

            - 自定义组件使用时直接使用hidden属性是不会生效，需要我们在自定义组件中申明hidden属性，并绑定到自定义组件最外层view的hidden属性上面。  

                ```xml
                <view hidden="{{hidden}}" >
                    ...
                </view>
                ```

                ```js
                Component({
                    properties: {
                        hidden: Boolean,
                    },
                })
                ```
                父类组件使用

                ```xml
                <v-component hidden="{{false}}" />
                ```

            - 我们还可以通过 `wx:if` 对自定义组件进行显示隐藏控制，这里我们需要注意，这样会触发自定义组件的生命周期。  

                 ```xml
                <v-component wx:if="{{false}}" />
                ```

4. **使用自定义组件**

    使用已注册的自定义组件前，首先要在页面的 `json` 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径  

    ```json
    {
        "usingComponents": {
            "v-componentName": "path/to/the/custom/component"
        }
    }
    ```
    这样，在页面的 wxml 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值。  
    ```xml
    <view>
        <v-componentName />
    </view>
    ```

## Promise

> 关于Promise不想做太多的介绍，主要是Promise相对于回调而言，优势很多很多，这里有一篇使用简介文章可以看下,[点我](https://www.jianshu.com/p/c98eb98bd00c)

> 优点：
    1. 可以return
    2. 解决了回调嵌套的问题(俗称的地狱回调)

## WXS

> **WXS**(`WeiXin Script`)是小程序的一套脚本语言，结合 *WXML*，可以构建出页面的结构。[关于WXS具体介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/index.html?search-key=wxs)

这里我们可以有两种方法进行编写

1. 直接在 `wxml` 中进行编写使用

    ```xml
    <wxs module="demo" >
        //这里我们可以编写具体的逻辑代码
        var msg = ""
        module.exports={
            msg:msg
        }
    </wxs>
    <text>{{demo.msg}}</text>
    ```

2. 我们还可以在外部新建类来编写逻辑代码，通过**WXS**`src`属性来进行引入(这样方便我们多个 `wxml` 中进行复用)

    ```js
    //这里我们需要注意这个类的后缀为wxs
    var msg = function () {
        return 'hello word'
    }

    module.exports = {
        msg,
    }
    ```

    ```xml
    <wxs src="路径名" module="demo" />
    <text>{{demo.msg}}</text>
    ```

## 个人总结的一些技巧

- `setData` 与直接赋值的区别

    ```js
    Page({

        data:{
            msg:''
        },

        onLoad: function (options) {
            //这里只会更新data中msg的值，不会刷新页面
            this.data.msg = 'hello word'
            //更新data中msg的值，并且刷新页面
            this.setData({
                msg,
            })
        }
    })
    ```

- 外部样式不能覆盖组件样式的问题

    ```css
    .container{
        <!-- 这里使用!important进行强行覆盖 -->
        background-color: #fffddd !important;
    }
    ```

- css样式复用

    我们可以创建一个通用的 `wxss` 样式文件，在需要复用的组件或者 `page` 中使用 `@import "..通用样式路径";` 来进行复用