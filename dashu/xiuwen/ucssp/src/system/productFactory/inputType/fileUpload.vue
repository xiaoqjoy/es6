<template>
	<div class="fileUpload">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<form id="upload" enctype="multipart/form-data" method="post">
			<input style="width: 200px;"  @change="getFile($event)" type="file" name="file" id="pic" placeholder="导入" />{{parameterValue}}
			<i style="cursor: pointer;" @click="closeValue()" v-if="parameterValue" class="el-icon-circle-close"></i>
			<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
			<el-button :disabled="disabledflag" type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
		</form>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
  import { fileCos } from '@common/js/fileCos.js';
	import COS from 'cos-js-sdk-v5';
	export default {
		data() {
			return {
				Bucket: fileCos.getCos(),
				buttonFalg: false,
				changeFlag: false,
				parameterValue: '',
				columnName: "",
				file: "",
				upFlag: false
			};
		},
		methods: {
			noblur() {
				console.log(this.data);
			},
			closeValue() {
				this.parameterValue = '';
				this.changeData();
			},
			inputblur() {
				if (!this.parameterValue) {
					this.$message.error("该参数必须得填写");
				};
			},
			getFile(event) {
				this.file = event.target.files[0];
				console.log(this.file);
				let uploadModel = {};
				if (this.file) {
					uploadModel = {
						name: this.file.name,
						size: parseFloat(this.file.size / (1024 * 1024)).toFixed(2),
						type: this.file.name.substring(this.file.name.lastIndexOf(".") + 1)
					};
					console.log(uploadModel);
					this.uploadModel = uploadModel;
					let accept = ["excel", "word", "pdf", "docx", "xlsx", "xls", "xml"];
					if (accept.indexOf(uploadModel.type.toLocaleLowerCase()) < 0) {
						this.$message({
							showClose: true,
							message: '请选择正确的文件格式上传',
							type: 'warning'
						});
						this.upFlag = false;
					} else {
						this.upFlag = true;
					}
				};
			},
			getSignature(uploadModel) {
				return new Promise((resolve, reject) => {
					this.$MyFetch.post(poductApi.newFile, {
						storageTime: "f",
						extensionName: uploadModel.type,
						accessType: "PUB"
					}).then((res) => {
						resolve(res);
					}).catch((error) => {
						reject(error);
						});
					});
			},
			fileUpload() {
				let that = this;
				this.cos.putObject({
					Bucket: this.Bucket,
					Region: "ap-guangzhou",
					Key: this.filePath,
					StorageClass: 'STANDARD',
					Body: this.file
				}, function(err, data) {
					console.log(err || data);
					if (err) {
						that.$message({
							showClose: true,
							message: err,
							type: 'error'
						});
						return;
					}
					if (data.statusCode === 200) {
						that.$message({
							showClose: true,
							message: '上传成功',
							type: 'success'
						});
						console.log(that.fileId, that.uploadModel.type, that.file.name, that.parameterValue);
						let json = {
							templateNo: that.parameterValue ? that.parameterValue : "",
							fileId: that.fileId,
							fileName: that.file.name,
							fileType: that.uploadModel.type
						};
						console.log(json);
						that.$MyFetch.post(poductApi.interactiveUpload, json)
							.then((data = {}) => {
								console.log(data);
								console.log(data.fileName);
								console.log(that.data.addButtonFunction);
								if (that.data.addButtonFunction === "getName") {
									if (that.childkey + 1) {
										if (that.partsKey + 1) {
											that.$emit('getName', that.ikey, that.jkey, that.itemkey, data.fileName, that.childkey, that.partsKey);
										} else {
											that.$emit('getName', that.ikey, that.jkey, that.itemkey, data.fileName, that.childkey);
										}
									} else {
										if (that.partsKey + 1) {
											that.$emit('getName', that.ikey, that.jkey, that.itemkey, data.fileName, that.partsKey);
										} else {
											that.$emit('getName', that.ikey, that.jkey, that.itemkey, data.fileName);
										}
									}
								}
								that.parameterValue = data.fileId;
								that.changeData();
							})
							.catch((err) => {
								console.log(err);
								that.$message.error(err.message);
							});
					}
				});
			},
			buttonF() {
//				let formData = new FormData();
//				formData.append("file", this.file);
//				formData.append("file_id", this.parameterValue);
//				if (this.data.addButtonFunction === "upload") {
//					console.log(poductApi.interactiveUpload);
//					axios.post(poductApi.interactiveUpload, formData).then(success => {
//						console.log(success.data.code);
//						if (success.data.code === "200") {
//							this.parameterValue = success.data.data.fileId;
//							this.$message.success("上传成功");
//							this.changeData();
//						} else {
//							this.$error(success.data.message);
//						}
//					}).catch(err => {
//						console.log(err, 2);
//						this.$error(err.message);
//					});
//				}
				if (this.upFlag) {
					this.getSignature(this.uploadModel).then(res => {
						console.log(res);
						var obj = {
							TmpSecretId: res.credentials.tmpSecretId,
							TmpSecretKey: res.credentials.tmpSecretKey,
							XCosSecurityToken: res.credentials.sessionToken,
							ExpiredTime: res.credentials.expiredTime
						};
						this.fileId = res.fileInfo.fileId;
						this.filePath = res.fileInfo.filePath;
						this.cos = new COS({
							getAuthorization: function (options, callback) {
								callback(obj);
							}
						});
						this.fileUpload();
					});
				} else {
					this.$message({
						showClose: true,
						message: '请先上传或上传正确文件',
						type: 'warning'
					});
				}
			},
			changeData() {
				if (this.fn) {
					if (this.childkey + 1) {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey);
						}
					} else {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.partsKey);
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, this.parameterValue, this.partsKey, this.data.inputAttribute);
							}
						} else {
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, this.parameterValue, this.data.inputAttribute);
							}
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue);
						}
					};
				};
			}
		},
		mounted() {
			if (this.data.addButton) {
				this.buttonFalg = true;
			}
			if (this.data.parameterValue) {
				this.parameterValue = this.data.parameterValue;
			} else {
				this.parameterValue = this.data.defaultValue;
			}
			if (this.data.columnName) {
				this.columnName = this.data.columnName;
			}//			this.changeData();
		},
		props: ['data', 'itemkey', 'fn', 'jkey', "ikey", 'childkey', 'disabledflag', 'partsKey']
	};
</script>

<style scoped lang="less">
	.fileUpload {
		margin: 5px 0;
		div{
			font-size: 12px;
			color: #BBBBBB;
			line-height: 20px;
			span{
				font-size: 14px;
				color: #FF0000;
				display: block;
				margin-top: 3px;
				float: left;
			}
		}
		form{
			font-size: 12px;
			color: #BBBBBB;
			line-height: 20px;
			span{
				font-size: 14px;
				color: #FF0000;
				display: block;
				float: left;
			}
		}
	}
</style>
