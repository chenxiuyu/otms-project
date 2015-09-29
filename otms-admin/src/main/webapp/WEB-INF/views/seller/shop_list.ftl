<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<#include "../common/detailheader.ftl" />
<script type="text/javascript" src="${domainUrlUtil.EASYUI_BASEURL_DOMAIN}js/datagrid-detailview.js"></script>
<title>店铺列表</title>
</head>
<body class="easyui-layout">

<#--1.queryForm----------------->
<div id="searchbar" data-options="region:'north'" style="height:66px;" border="false">
	<div id="searchbox" class="head-seachbox">
		<h2 class="h2-title">店铺信息列表 <span class="s-poar"><a class="a-extend" href="#">收起</a></span></h2>
		<div class="w-p99 marauto searchCont">
		<form class="form-search" action="doForm" method="post" id="queryForm" name="queryForm">
			<div class="fluidbox"><!-- 不分隔 -->
				<p class="p1 p-item"><label class="lab-item">店铺名称:</label></p>
				<p class="p2 p-item"><input type="text" style="width:220px" class="txt" id="q_codeDiv" name="q_codeDiv" value="${q_shopName!''}"/></p>
				<p class="p1 p-item"><label class="lab-item">商家账号:</label></p>
				<p class="p2 p-item"><input type="text" style="width:220px" class="txt" id="q_codeCd" name="q_codeCd" value="${q_sellerName!''}"/></p>
				<a id="a-gridSearch" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">查询</a>
			</div>
		</form>
		</div>
	</div>
</div>

<#--2.datagrid----------------->
<div data-options="region:'center'" border="false">
	<table id="dataGrid" class="easyui-datagrid"  style="width:700px;height:250px"
			data-options="rownumbers:true
						,singleSelect:true
						,autoRowHeight:false
						
						,toolbar:'#gridTools'
						,striped:true
						,pagination:true
						,pageSize:'${pageSize}'
						,fit:true
    					,url:'${domainUrlUtil.BASEURL_DOMAIN}seller/shops/list'
    					,queryParams:queryParamsHandler()
    					,onLoadSuccess:dataGridLoadSuccess
    					,method:'get'">
		<thead  data-options="frozen:true">
			<tr>
				<th field="id" width="60" align="left">店铺ID</th> 
				<th field="name" width="255" align="left">店铺名称</th>
				<th field="userName" width="100" align="left">商家名称</th>
		    </tr>
		</thead>  
		<thead>
		    <tr> 
	            <th field="extra.outerCode" width="80">商家编码</th>  	             
	            <th field="taxRegisterNo" align="left">税务登记号</th> 
	            <th field="phone" align="left">电话</th> 
	            <th field="email" align="left">邮箱</th>
	            <th field="street" align="left"formatter="addressFormatter" >地址</th> 
	            <th field="extra.depositNeed" align="left" >保证金</th> 
	            <th field="extra.techFeeNeed" align="left" >技术服务费</th> 
	            <th field="extra.techFeeNeed" align="left" >二级域名</th> 
	            <th field="status" formatter="statusFormatter">状态</th> 
	            <th field="businessId" formatter="categoryFormatter">类目</th>
			</tr>
		</thead>
	</table>
	
	<#--3.function button----------------->
	<div id="gridTools">
		<a id="a-license" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">查看店铺证件</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">查看保证金余额</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">设置费用</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">冻结</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">解冻</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">商家授权</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">绑定二级域名</a>
		<a id="a-deposit" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="doSearch()">配置编码/NTalk</a>
	<div>
</div>
<script type="text/javascript">
	$(function(){
		$('.icon-search').click(function () {
			$('#dataGrid').datagrid('load',queryParamsHandler());  
		});
	})
	//datagrid数据加载成功后的回调函数
	function afterDataGridLoaded(){
	}
	
	function useYnFormat(value,row,index){
		return value;
	}
	function addressFormatter(value,row,index){
		return row['provinceName']+row.cityName+row.regionName+row.street;
	}
	function statusFormatter(value,row,index){
		if(value== '0'){
			return "待审批";
		}else if(value == '1'){
			return "正常";
		}else if(value=='-2'){
			return "审批不通过";
		}else if (value=='-1'){
			return "冻结";
		}
		return "未知";
	}
	function categoryFormatter(value,row,index){
		var map = {};
		map['1']='家电';
		map['2']='家具';
		map['3']='家装';
		map['4']='家饰';
		map['5']='净水';
		if(value=='5'){
			var water = {};
			water['0']='默认';
			water['1']='O2O体验馆';
			water['2']='体验馆DTD供货商';
			if(row.isWater){
				return map[value] + "【"+water[row.isWater]+"】";
			}else{
				return map[value] + "【默认】";
			}
		}else{
			return map[value];
		}
	}
	
	
	/*查询*/
	function doSearch(){
		var qCodeDiv=$('#q_codeDiv').val();
		var qCodeCd=$('#q_codeCd').val();
		$('#dataGrid').datagrid('load');
	}
	
</script>
<#include "../common/detailfooter.ftl" />