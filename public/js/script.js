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
    watch: {
        imgid: function() {
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
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
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
        addEventListener("hashchange", function() {
            if (location.hash != "#null") {
                self.imgid = location.hash.slice(1);
            }
        });
        axios
            .get("/imageboard")
            .then(function(response) {
                self.images = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
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
            location.hash = img;
        },
        close: function() {
            this.imgid = null;
            location.hash = "";
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
