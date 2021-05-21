Vue.use(VueResource);
var globalurl = "/api/data/";

var app = new Vue({
    el: "#content",
    data: {
        DataInfo: [],
        // 页码总数
        page_count: 0,
        // 页面小于5
        page_number: null,
        // 当前页码
        now_page: 1,
        // 页码大于5
        page_gt_number: [1, 2, 3, 4, 5],
        // 下一页
        next: 2,
        // 前一页
        previous: 0,

        // 过滤字段
        id: null,
        name: '',
        position: '',
        types: '',
        date: '',
    },
    created: function () {
        this.$http.get(globalurl).then(
            function (data) {
                console.log(data['data']['results']);
                this.DataInfo = data['data']['results'];
                this.page_count = Math.ceil(data['data']['count'] / 10);
                if (this.page_count <= 5 && this.page_count > 1) {
                    for (let i = 1; i <= this.page_count; i++) {
                        this.page_number.push(i)
                    }
                } else {
                    this.page_number = null
                }
            },
            function (error) {
                console.log(error)
            },
        )
    },
    methods: {
        device_filter: function () {
            this.name = $("#validationDefault01").val();
            this.position = $("#validationDefault02").val();
            this.date = $("#validationCustom03").val();
            this.types = $("#validationDefault04").val();
            console.log(this.name, this.position, this.date, this.types)
            this.$http.get(globalurl, {
                params: {
                    name: this.name,
                    position: this.position,
                    date: this.date,
                    types: this.types
                }
            }).then(
                function (data) {
                    this.DataInfo = data['data']['results'];
                    this.page_count = Math.ceil(data['data']['count'] / 10);
                    this.next = 2;
                    this.previous = 0;
                    this.now_page = 1;
                    this.page_gt_number = [1, 2, 3, 4, 5];
                    if (this.page_count <= 5 && this.page_count > 1) {
                        for (let i = 1; i <= this.page_count; i++) {
                            this.page_number.push(i)
                        }
                    } else {
                        this.page_number = null
                    }
                }
            )
        },
        add_data: function () {
            this.name = $("#formGroupExampleInput1").val();
            this.position = $("#formGroupExampleInput2").val();
            this.date = $("#formGroupExampleInput3").val();
            this.types = $("#formGroupExampleInput4").val();
            if (this.name === '') {
                $("#error_title").text('名称不能为空')
                return false
            }
            if (this.position === '') {
                $("#error_title").text('位置不能为空')
                return false
            }
            if (this.date === '') {
                $("#error_title").text('时间不能为空')
                return false
            }
            if (this.types === '') {
                $("#error_title").text('类型不能为空')
                return false
            }
            this.$http.post(globalurl,
                {
                    "name": this.name,
                    "position": this.position,
                    "date": this.date,
                    "types": this.types,
                }
            ).then(
                function (data) {
                    alert("添加成功")
                    window.location.reload();
                },
                function (error) {
                    alert("数据有误")
                }
            )
        },
        update_data: function (id, name, position, date, types) {
            this.name = name
            this.position = position
            this.date = date
            this.types = types
            this.id = id
            $('#updateModal').modal("show")
        },
        update_confirm: function () {
            var url = globalurl + this.id + '/'
            this.name = $("#updateinput1").val();
            this.position = $("#updateinput2").val();
            this.date = $("#updateinput3").val();
            this.types = $("#updateinput4").val();
            this.$http.put(url,
                {
                    "name": this.name,
                    "position": this.position,
                    "date": this.date,
                    "types": this.types,
                }
                ).then(
                function(data){
                    // console.log(data);
                    alert("修改成功")
                    window.location.reload()

                },
                function (error) {
                    console.log(error);
                }
            )

        },
        delete_data: function (id) {
            var url = globalurl + id
            this.$http.delete(url).then(
                function (data) {
                    console.log(data);
                    alert("删除成功")
                    window.location.reload()

                },
                function (error) {
                    // console.log(error);
                }
            )
        },
        change_page: function (page) {
            var url = globalurl;
            this.now_page = page;
            console.log(this.now_page);
            this.$http.get(url, {
                params: {
                    page: page,
                    name: this.name,
                    position: this.position,
                    date: this.date,
                    types: this.types,
                }
            }).then(
                function (data) {
                    this.DataInfo = data['data']['results'];
                    if (page >= 1) {
                        if (page === this.page_count) {
                            this.next = 0;
                            this.previous = page - 1;
                        } else {
                            this.previous = page - 1;
                            this.next = page + 1;
                        }

                    }


                }
            );
            if (page >= 4) {
                console.log(this.page_count - page);
                if (this.page_count - page < 4) {
                    this.page_gt_number = [this.page_count - 4, this.page_count - 3, this.page_count - 2, this.page_count - 1, this.page_count]
                } else {
                    this.page_gt_number = [page - 2, page - 1, page, page + 1, page + 2];
                }

            }
            if (page < 4) {
                this.page_gt_number = [1, 2, 3, 4, 5]
            }

        },


    },

});