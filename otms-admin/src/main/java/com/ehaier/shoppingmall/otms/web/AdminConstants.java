package com.ehaier.shoppingmall.otms.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdminConstants {

	// 默认分页每页显示记录条数
	public final static int DEFAULT_PAGE_SIZE = 20;

	// 是否使用
	public final static int USE_YN_Y = 1; // 使用

	public final static int IS_USER_INPUT_Y = 1; // 使用
	public final static int IS_USER_INPUT_N = 0; // 使用

	//短信模板
	//手工处理佣金模板
	public static Integer       TEMPLATE_MANUAL_MOBILE_VERIFY   = 18;
	// 存在mechache中手机验证码的key
	public final static String  MOBILE_VERIFY_CODE                = "shoppingmall:ckmember:web:mobile:";
	//memcache半小时失效
	public static int           TIME_OUT_HLAF_HOURS               = 30 * 60;
	public final static String  USER_COOKIE_KEY                   = "SOMPLE_SHOP";




	// 商城的页面类型
	public final static String PAGE_TYPE_INDEX = "index"; // 首页
	public final static String PAGE_TYPE_NEWINDEX = "newindex"; // 新首页
	public final static String PAGE_TYPE_CATE_ICEBOX = "cate_ib"; // 冰箱类目页
	public final static String PAGE_TYPE_CATE_AIRCON = "cate_ac"; // 空调类目页
	public final static String PAGE_TYPE_CATE_WASHING = "cate_wm"; // 洗衣机类目页
	public final static String PAGE_TYPE_CATE_TV = "cate_tv"; // 彩电类目页
	public final static String PAGE_TYPE_CATE_HEATER = "cate_heater"; // 热水器类目页
	public final static String PAGE_TYPE_CATE_KIT = "cate_kit"; // 厨房家电类目页
	public final static String PAGE_TYPE_CATE_SEA = "cate_sea"; // 精品小家电频道页

	public final static String HOT_SEARCH_URL_SUFFIX = ".html"; // 热搜词生成URL的后缀

	public final static Integer SITE_ID = 1;
	public final static Integer BRAND_IS_BEST = 0; // 商品品牌是否推荐，默认0
	public final static String INPUT_MODE_SELECT = "0"; // 属性录入方式 下拉列表
	public final static String INPUT_MODE_CHECKBOX = "1"; // 属性录入方式 复选框
	public final static String INPUT_MODE_TEXT = "2"; // 属性录入方式 文本框
	public final static String INPUT_MODE_SELECTANDTEXT = "3"; // 属性录入方式
																// 下拉列表-文本框

	@SuppressWarnings("restriction")
	public final static String LINE_SEPARATOR = (String) java.security.AccessController
			.doPrivileged(new sun.security.action.GetPropertyAction(
					"line.separator")); // 系统换行符
	// mongo允许的文件类型
	public static final List<String> allowedFileTypes = new ArrayList<String>(
			10);
	// mongo允许的内容类型
	public static final Map<String, String[]> ALLOWED_CONTENTTYPE = new HashMap<String, String[]>();

	public static final String[] IMAGE_CONTENTTYPE = new String[] {
			"image/jpeg", "image/pjpeg", "image/png", "image/x-png" };
	public static final String[] ICON_CONTENTTYPE = new String[] { "image/x-icon" };
	public static final String[] FLASH_CONTENTTYPE = new String[] { "application/x-shockwave-flash" };

	// mongo允许上传的文件大小（字节）
	public static final Integer ALLOWED_SIZE = 2048000;

	static {
		// 'image', 'flash', 'icon'
		allowedFileTypes.add("image");
		allowedFileTypes.add("flash");
		allowedFileTypes.add("icon");

		ALLOWED_CONTENTTYPE.put("image", IMAGE_CONTENTTYPE);
		ALLOWED_CONTENTTYPE.put("icon", ICON_CONTENTTYPE);
		ALLOWED_CONTENTTYPE.put("flash", FLASH_CONTENTTYPE);
	}

	public static final String FILE_DOMAIN = "http://static.testehaier.com/";

	public static final String FILE_TYPE_INDEX_SCROLL = "INDEX_SCROLL";

	public static final int COMMENT_JOB_PROCESS_COMMENT_STATUS = 1; // 处理评论中间表状态JOB
	public static final int COMMENT_JOB_INVITE_COMMENT = 2; // 邀请用户评价晒单JOB
	public static final int COMMENT_JOB_HERO = 3; // 黑石礁JOB

	public final static String MAIN_920_POP_TV = "9"; // 人气爆款-彩电
	public final static String MAIN_920_POP_WASHING = "11"; // 人气爆款-洗衣机
	public final static String MAIN_920_POP_ICE_BOX = "13"; // 人气爆款-冰箱
	public final static String MAIN_920_POP_AIR_CON = "15"; // 人气爆款-空调
	public final static String MAIN_920_POP_KITCHEN = "17"; // 人气爆款-厨电
	public final static String MAIN_920_POP_HEATER = "19"; // 人气爆款-热水器
	public final static String MAIN_920_POP_ELE_APP = "21"; // 人气爆款-生活家电
	public final static String MAIN_920_ACT = "1"; // 抽奖活动
	public final static String MAIN_920_POINT_TO_COUPON = "3"; // 小积分换优惠
	public final static String MAIN_920_RECEIVE_COUPON = "5"; // 嗨领百万优惠
	public final static String MAIN_920_ROB_CASH = "7"; // 嗨抢整点现金
	public final static String MAIN_920_AD = "25"; // 主场广告位

	public final static String SALE_920_BEYOND_919_0 = "27"; // 超值秒杀919-0
	public final static String SALE_920_BEYOND_919_9 = "29"; // 超值秒杀919-9
	public final static String SALE_920_BEYOND_919_14 = "31"; // 超值秒杀919-14
	public final static String SALE_920_BEYOND_919_21 = "33"; // 超值秒杀919-21

	public final static String SALE_920_BEYOND_920_0 = "35"; // 超值秒杀920-0
	public final static String SALE_920_BEYOND_920_9 = "37"; // 超值秒杀920-9
	public final static String SALE_920_BEYOND_920_14 = "39"; // 超值秒杀920-14
	public final static String SALE_920_BEYOND_920_21 = "41"; // 超值秒杀920-21

	public final static String SALE_920_BEYOND_921_0 = "43"; // 超值秒杀921-0
	public final static String SALE_920_BEYOND_921_9 = "45"; // 超值秒杀921-9
	public final static String SALE_920_BEYOND_921_14 = "47"; // 超值秒杀921-14
	public final static String SALE_920_BEYOND_921_21 = "49"; // 超值秒杀921-21

	public final static String SALE_920_AREA_XINJIANG = "51"; // 区域秒杀-新疆地区
	public final static String SALE_920_AREA_SHANDONG = "53"; // 区域秒杀-山东地区
	public final static String SALE_920_AREA_BEIJING = "55"; // 区域秒杀-北京地区

	public final static String SALE_920_TIMED_SHOPPING_M = "57"; // 限时抢购-早市9:20-18:00
	public final static String SALE_920_TIMED_SHOPPING_N = "59"; // 限时抢购-夜市18:00-次日9:20
	public final static String SALE_920_HOT_SALE = "61"; // 热销爆款
	public final static String SALE_920_AD = "62"; // 特卖场广告位

	/** 双十一主场 **/
	public final static String MAIN_1111_IMG = "63"; // 主场头图
	public final static String MAIN_1111_ACT = "65"; // 主场积分抽奖
	public final static String MAIN_1111_POINT_TO_COUPON = "67"; // 主场小积分换优惠
	public final static String MAIN_1111_RECEIVE_COUPON = "69"; // 主场嗨领百万优惠
	public final static String MAIN_1111_ROB_CASH = "71"; // 主场嗨抢整点现金

	public final static String MAIN_1111_POP_TV = "73"; // 主场人气爆款-彩电
	public final static String MAIN_1111_POP_WASHING = "75"; // 主场人气爆款-洗衣机
	public final static String MAIN_1111_POP_ICE_BOX = "77"; // 主场人气爆款-冰箱
	public final static String MAIN_1111_POP_AIR_CON = "79"; // 主场人气爆款-空调
	public final static String MAIN_1111_POP_KITCHEN = "81"; // 主场人气爆款-厨电
	public final static String MAIN_1111_POP_HEATER = "83"; // 主场人气爆款-热水器
	public final static String MAIN_1111_POP_ELE_APP = "85"; // 主场人气爆款-生活家电

	public final static String MAIN_1111_POP_TV_AD = "74"; // 主场人气爆款-彩电-广告位
	public final static String MAIN_1111_POP_WASHING_AD = "76"; // 主场人气爆款-洗衣机-广告位
	public final static String MAIN_1111_POP_ICE_BOX_AD = "78"; // 主场人气爆款-冰箱-广告位
	public final static String MAIN_1111_POP_AIR_CON_AD = "80"; // 主场人气爆款-空调-广告位
	public final static String MAIN_1111_POP_KITCHEN_AD = "82"; // 主场人气爆款-厨电-广告位
	public final static String MAIN_1111_POP_HEATER_AD = "84"; // 主场人气爆款-热水器-广告位
	public final static String MAIN_1111_POP_ELE_APP_AD = "86"; // 主场人气爆款-生活家电-广告位

	public final static String MAIN_1111_RULE = "87"; // 主场活动规则
	public final static String MAIN_1111_AD = "89"; // 主场广告位

	/** 双十一特卖场 **/
	public final static String SALE_1111_IMG = "91"; // 特卖场头图
	public final static String SALE_1111_BEYOND_119_0 = "105"; // 超值秒杀119-0
	public final static String SALE_1111_BEYOND_119_9 = "107"; // 超值秒杀119-9
	public final static String SALE_1111_BEYOND_119_14 = "109"; // 超值秒杀119-14
	public final static String SALE_1111_BEYOND_119_21 = "111"; // 超值秒杀119-21

	public final static String SALE_1111_BEYOND_1110_0 = "113"; // 超值秒杀1110-0
	public final static String SALE_1111_BEYOND_1110_9 = "115"; // 超值秒杀1110-9
	public final static String SALE_1111_BEYOND_1110_14 = "117"; // 超值秒杀1110-14
	public final static String SALE_1111_BEYOND_1110_21 = "119"; // 超值秒杀1110-21

	public final static String SALE_1111_BEYOND_1111_0 = "121"; // 超值秒杀1111-0
	public final static String SALE_1111_BEYOND_1111_9 = "123"; // 超值秒杀1111-9
	public final static String SALE_1111_BEYOND_1111_14 = "125"; // 超值秒杀1111-14
	public final static String SALE_1111_BEYOND_1111_21 = "127"; // 超值秒杀1111-21

	public final static String SALE_1111_AREA_XINJIANG = "129"; // 区域秒杀-新疆地区
	public final static String SALE_1111_AREA_SHANDONG = "131"; // 区域秒杀-山东地区
	public final static String SALE_1111_AREA_BEIJING = "133"; // 区域秒杀-北京地区

	public final static String SALE_1111_TIMED_SHOPPING_M = "135"; // 限时抢购-早市9:20-18:00
	public final static String SALE_1111_TIMED_SHOPPING_N = "137"; // 限时抢购-夜市18:00-次日9:20
	public final static String SALE_1111_HOT_SALE = "139"; // 热销爆款
	public final static String SALE_1111_RULE = "141"; // 特卖场活动规则
	public final static String SALE_1111_AD = "143"; // 特卖场广告位

	// 验证码缓冲key
	public final static String VALIDATE_CODE_KEY = "shp:basic:validate_code:1";
	// 注册短信key
	public final static String REGISTER_SMS_KEY = "shop:basic:register:sms:switch";

	public final static String REGISTER_SMS_ON = "1"; // 开
	public final static String REGISTER_SMS_OFF = "0"; // 关

	// 验证码是否使用
	public final static int APPLYTYPE_USE = 1; // 使用

	public static String PARTNER_ID             = "200000050158";
	// 商户的测试私钥
	public static String KEY                    = "123456";

	//字符编码格式 目前支持 gbk 或 utf-8
	public static String _INPUT_CHARSET         = "utf-8";

	//签名方式 不需修改
	public static String SIGN_TYPE              = "ITRUSSRV";
	//查询返回地址
	public static String SEARCHRETURN_URL       = "";

	//服务接入网关URL
	public static String KJTPAY_GATEWAY         = "https://mag.kjtpay.com/mag/gateway/receiveOrder.do";
	//版本
	public static String VERSION                = "1.0";

	public static String MEMO                   = "";
	//检查标志 0：不检查 1 ：检查

	public static String CHECK_FLAG             = "0";
	public static String COMPAY_NAME            = "青岛海尔智能家电科技有限公司";
	public static String EHAIER_IDENTITY_NO     = "wangzhiqiu@haier.com";
	//会员标识平台类型
	public static String IDENTITY_TYPE          = "1";
	//收款方会员标识平台类型
	public static String PAYEE_IDENTITY_TYPE    = "1";
	//对账接口查询page size
	public static String TRANSDATA_PAGE_SIZE    ="1000";

}
