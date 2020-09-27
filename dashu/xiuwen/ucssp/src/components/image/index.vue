<template>
	<!-- 影像平台 -->
	<!-- <el-dialog class="image-component" title="影像资料" :visible="imageVisible" @open="cutImg" @close="imageClose" width="1200px" center> -->
	<!-- <input type="button" id="taskId" name="taskId" value="CutImg" onclick="cutImg()"/> -->
	<div class="image-component">
		<!-- {{this.$route.query}} -->
		<object class="internal" id="UBSCAN" ref="internal" classid="clsid:7B19E71B-5A4F-4C6E-970E-5E372EBA2517" style="width:100%; height: 100%;"></object>
	</div>

	<!-- </el-dialog> -->
</template>

<script>
	import { baseApi } from "@common/js/server.js";
	export default {
		name: "image-component",
		props: {
			// 申请编号
			// applicationId: {
			//   type: String,
			//   default: ""
			// },
			// // 菜单编码
			// menuDesc: {
			//   type: String,
			//   default: ""
			// },
			// // 影像平台的显示与隐藏
			// imageVisible: {
			//   type: Boolean,
			//   default: false
			// }
		},
		data() {
			return {
				applicationId: "", // 申请编号
				menuDesc: "", // 菜单编码
				menuId: "", // 菜单id
				imageUrl: "", // 影像上传成功回调的影像平台提交接口
				parameterData: null, // 接口参数
        ReadOnly: "", // 影像是否只读'0':只读，'':可编辑
				productId: "",
				selectProductId: ''
			};
		},
		created() {
			let query = this.$route.query;
			this.applicationId = query.applicationId;
			this.menuDesc = query.menuDesc;
			this.menuId = query.menuId;
			// this.imageUrl = query.imageUrl;
			// this.parameterData = query.parameterData !== '{}' ? JSON.parse(query.parameterData) : {};
			this.ReadOnly = query.ReadOnly;
			this.productId = query.productId;
			this.selectProductId = query.selectProductId;
      // alert(this.productId);
			console.log(`applicationId：${this.applicationId}, menuDesc：${this.menuDesc}, menuId：${this.menuId}, productId：${this.productId}, selectProductId：${this.selectProductId}`);

			// 开启影像平台
			// this.cutImg();

			// 调用影像平台提交
			// window.image_scan_submit = () => {
				// this.confirmFn('上传完成', 'success');
				// console.log(this.applicationId, this.menuDesc, this.menuId, this.imageUrl, this.parameterData);
				// Object.assign(this.parameterData, { addResults });
				// console.log(this.parameterData);
				//    if (r) {
				// 如果imageUrl存在则调用
				//      if (this.imageUrl) {
				//        this.$MyFetch
				//        .post(this.imageUrl, {applicationId: this.applicationId, parameterData: this.parameterData})
				//        .then(res => {
				//          this.confirmFn('影像提交成功', 'success');
				//          window.open(location, '_self').close();
				//        })
				//        .catch(err => {
				//          this.confirmFn(err.message, 'error');
				//        });
				//      }
				// window.open(location, '_self').close();
			// };

			// this.$nextTick(() => {
			// 	// this.$refs.internal.style.height = window.screen.availHeight + "px";
			// });
		},
		methods: {
			// 开启影像平台
			cutImg() {
				this.$nextTick(() => {
          // 影像平台接口
          if (this.menuDesc === "出账系统") {
            // alert(this.menuDesc);
            // alert(this.applicationId);
            // alert(this.menuId);
            // alert(this.productId);
            this.initByProduct();
          } else {
            this.imageInit();
          }
        });
			},
			// 影像平台接口
			imageInit() {
				const data = {
					applicationId: this.applicationId, // 影像批次号
					menuDesc: this.menuDesc, // 菜单编码
					menuId: this.menuId, // 菜单id
					// scanuser: "张三", // 当前柜员
					// watermark: "大数金融" // 水印文字
					selectProductId: this.selectProductId
				};
				// console.log(data);
				this.$MyFetch
					.post(baseApi.imageInit, data)
					.then(res => {
						// console.log(res);
						// alert('调用影像平台接口成功');

						// 影像平台
						// let expriationTime = this.$Moment(new Date(new Date().getTime() + 1000 * 60 * 30)).format('YYYY-MM-DD HH:mm:ss');
						// window.cutImg(JSON.stringify(res));

						// Object.assign(res, {
						// 	ReadOnly: this.ReadOnly
						// });
						console.log(res);

						window.UBSCAN.init(JSON.stringify(res));
						window.UBSCAN.SetToken(localStorage.getItem('DSF-token'), '');
					})
					.catch(err => {
						// this.confirmFn(err.message, 'error');
						alert(err.message);
					});
      },
      initByProduct() {
        const data = {
          applicationId: this.applicationId,
          menuDesc: this.menuDesc,
          menuId: this.menuId,
					productId: this.productId,
					selectProductId: this.selectProductId
				};
        this.$MyFetch
          .post(baseApi.initByProduct, data)
          .then(res => {
            // console.log(res);
            // alert('调用影像平台接口成功');

            // 影像平台
            // let expriationTime = this.$Moment(new Date(new Date().getTime() + 1000 * 60 * 30)).format('YYYY-MM-DD HH:mm:ss');
            // window.cutImg(JSON.stringify(res));

            // Object.assign(res, {
            // 	ReadOnly: this.ReadOnly
            // });
            // console.log(res);

            window.UBSCAN.init(JSON.stringify(res));
            window.UBSCAN.SetToken(localStorage.getItem("DSF-token"), "");
          })
          .catch(err => {
            // this.confirmFn(err.message, 'error');
            alert(err.message);
          });
      }
			// 影像平台的关闭
			// imageClose() {
			//   this.$emit("imageClose");
			// }
		},
		mounted() {
			// 延迟2秒启动影像平台
			this.timer = setTimeout(() => {
				this.cutImg();
				clearTimeout(this.timer);
			}, 2000);
			window.onfocus = function() {
				window.UBSCAN.AxRegisterHotKeys();
			};
			window.onblur = function() {
				window.UBSCAN.UnregisterHotKeys();
			};
		}
	};
</script>

<style lang="less" scoped>
	.image-component {
		height: 100%;
	}
</style>
