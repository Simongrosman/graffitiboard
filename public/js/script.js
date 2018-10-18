// (function() {
/////////////////////////////VUE componant///////////////////////////////
Vue.component("image-modal", {
    data: function() {
        return {
            imgdata: {},
            comments: [],
            newcomment: {
                comment: "",
                username: "",
                imgid: this.imgid
            }
        };
    },
    props: ["imgid"],
    template: "#image-modal",
    mounted: function() {
        var self = this;
        axios
            .post("/imagemodal", { imgid: self.imgid })
            .then(function(response) {
                self.imgdata = response.data.rows[0];
            })
            .then(function() {
                axios
                    .post("/commentsboard", { imgid: self.imgid })
                    .then(function(response) {
                        self.comments = response.data;
                        console.log(response.data);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    methods: {
        clickonmodal: function() {
            this.$emit("close");
        },
        uploadcomment: function(e) {
            var me = this;
            axios
                .post("/uploadcomment", {
                    comment: me.newcomment.comment,
                    username: me.newcomment.username,
                    imgid: me.newcomment.imgid
                })
                .then(function(response) {
                    me.comments.unshift(response.data);
                    console.log();
                })
                .catch(function() {
                    if (err) {
                        console.log("err: ", err);
                    } else {
                        console.log("else!");
                    }
                });
        }
    }
});
/////////////////////////////VUE PARANT///////////////////////////////
new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: "",
        imgid: location.hash.slice(1),
        hash: "",
        hasMore: true
    },
    created: function() {},
    mounted: function() {
        var self = this;
        axios.get("/imageboard")
            .then(function(response) {
            self.images = response.data;
            })
            .catch(function(err) {
                console.log(err);
            })
        var me = this;
        addEventListener('hashchange', function () {
            me.imageId
        })
        this.getImage()
    },
    watch: {
        self.getImage()
    },
    },
    methods: {
        upload: function(e) {
            console.log("upload started");
            var formData = new FormData();
            formData.append("file", this.file);
            formData.append("description", this.description);
            formData.append("title", this.title);
            formData.append("username", this.username);
            var me = this;
            axios
                .post("/upload", formData)
                .then(function(response) {
                    me.images.unshift(response.data);
                })
                .catch(function() {
                    if (err) {
                        console.log("err: ", err);
                    } else {
                        console.log("else!");
                    }
                });
        },
        handleFileChange: function(e) {
            this.file = e.target.files[0];
        },
        getData: function(img) {
            this.imgid = img;
        },
        close: function() {
            this.imgid = null;
        },
        getMoreImages: function() {
            var instance = this;
            axios
                .get("/images/more", {
                    params: {
                        id: instance.images[instance.images.length - 1].id
                    }
                })
                .then(function(response) {
                    instance.images = instance.images.concat(
                        response.data.rows
                    );
                    if (instance.images[instance.images.length - 1].id == 1) {
                        instance.hasMore = false;
                    }
                });
        }
    }
});
