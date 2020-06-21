function getSample(name,css){
			return  `<!DOCTYPE html>
<html>
<head>
	<title>
	${name?name:''}
	</title>
	<link href="${css?css:''}" rel="stylesheet" type="text/css"/>
	<style type="text/css">
		.box-icon {
			cursor: pointer;
			margin-right: 22px;
			float: left;
			margin-bottom: 22px;
			font-size: 28pt;
			background: #2196F3;
			text-align: center;
			padding: 4px;
			border-radius: 14px;
			color: #fff;
		}
		.box-icon:hover{
			background: #2880c5;
		}
		.box-icon .title {
			font-size: 12pt;
			padding: 8px;
		}
	</style>
</head>
<body>
${app.prefix?'	<strong>add class "'+app.prefix+'"</strong>':''}
	<div class="container">`;
		}


		var app = new Vue({
			el:'#vuecontainer',
			data:{
				nama:null,
				css:null,
				prefix:null,
				icons:[],
				icondata:null,
				message:null,
				output:null,
				regexStart:null,
				regexEnd:null,
				addStart:null,
				addEnd:null,
				replaces:[]
			},
			methods:{
				copy:str=>{
					var el = document.createElement('textarea');
					el.value = str;
					el.setAttribute('readonly','');
					el.style = {position:'absolute',left:'-999999px'};
					document.body.appendChild(el);
					el.select();
					document.execCommand('copy');
					document.body.removeChild(el);
					alert('Copied...!');
				},
				pushIcon:(classname)=>{
					app.output += `	
		<div class="box-icon" onclick="copy('${app.prefix?app.prefix+' ':''}${classname}')">
			<i class="${app.prefix?app.prefix+' ':''}${classname}"></i>
			<div class="title">${classname?classname:''}</div>
		</div>`;
				},
				render:()=>{
					if(Array.isArray(app.icons) && app.icons.length){
						app.output = getSample(app.nama,app.css);
						app.message = null;
						app.icons.map(item=>{
							app.pushIcon(item);
						})
						var endscript = 'script';
						app.output += `	
	</div>
	<script>
	function copy(str){
		var el = document.createElement('textarea');
		el.value = '<i class="'+str+'"></i>';
		el.setAttribute('readonly','');
		el.style = {position:'absolute',left:'-999999px'};
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert('Copied...!');
	}
	</${endscript}>
</body>
</html>`;
					}else{
						app.message = 'icon input must array type and icon min 1 class name';
						app.output = null;
					}
				},
				updated:()=>{
					app.icons = app.icons.map(item=>{
						app.replaces.map(rep=>{
							item = item.replace(rep.find,rep.replace);
						});
						item = app.addStart + item + app.addEnd;
						return item;
					})
				},
				removeReplace:i=>{
					app.replaces.splice(i,1);
				},
				addReplace:()=>{
					app.replaces.push({
						find:'',
						replace:''
					})
				},
				removeIcon:i=>{
					app.icons.splice(i,1);
				},
				generate:()=>{
					app.icons = [];
					app.output = null;
					var a = app.icondata.split(app.regexStart);
					a = a.map(item=>{
						var b = item.split(app.regexEnd);
						item = b[0];
						return item
					})
					app.icons = a;
				}
			}
		})