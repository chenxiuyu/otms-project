package com.ehaier.shoppingmall.otms.web.webutil;

public class DomainUrlUtil {
    protected static org.apache.log4j.Logger log = org.apache.log4j.LogManager
                                                     .getLogger(DomainUrlUtil.class);
    public static String                     BASEURL_DOMAIN;
    public static String                     EASYUI_BASEURL_DOMAIN;
    public static String                     JS_BASEURL_DOMAIN;
    public static String                     CSS_BASEURL_DOMAIN;
    public static String                     IMG_BASEURL_DOMAIN;

    public static String                     TUAN_BASEURL_DOMAIN;
    public static String                     PRODUCT_IMG_SERVER_BASEURL_DOMAIN;
    public static String                     ALBUM_IMG_SERVER_BASEURL_DOMAIN;
    public static String                     PHP_BASEURL_DOMAIN;
    public static String                     EHAIER_BASE_DOMAIN;
    public static String                     EHAIER_IMG_BASE_DOMAIN;
    public static String                     EHAIER_SEARCH_URL_DOMAIN;
    public static String                     CDN_DOMAIN;
//    private static MongoUtils                mongoUtils;
//    private static SystemService     systemService;
    public static String                     BDF_CLIENT_ID;
    public static String                     MEMBER_DOMAIN;
    public static String                     CART_DOMAIN;
    public static String                     PAY_DOMAIN;
    public static String                     SEARCH_DOMAIN;
    public static String                     ITEM_DOMAIN;

    //    public static String                     CLIENT_IP;

    public void setBASEURL_DOMAIN(String bASEURL_DOMAIN) {
        BASEURL_DOMAIN = bASEURL_DOMAIN;
    }

    public void setEASYUI_BASEURL_DOMAIN(String eASYUI_BASEURL_DOMAIN) {
        EASYUI_BASEURL_DOMAIN = eASYUI_BASEURL_DOMAIN;
    }

    public void setJS_BASEURL_DOMAIN(String jS_BASEURL_DOMAIN) {
        JS_BASEURL_DOMAIN = jS_BASEURL_DOMAIN;
    }

    public void setCSS_BASEURL_DOMAIN(String cSS_BASEURL_DOMAIN) {
        CSS_BASEURL_DOMAIN = cSS_BASEURL_DOMAIN;
    }

    public void setIMG_BASEURL_DOMAIN(String iMG_BASEURL_DOMAIN) {
        IMG_BASEURL_DOMAIN = iMG_BASEURL_DOMAIN;
    }

    public void setTUAN_BASEURL_DOMAIN(String tUAN_BASEURL_DOMAIN) {
        TUAN_BASEURL_DOMAIN = tUAN_BASEURL_DOMAIN;
    }

    public void setPRODUCT_IMG_SERVER_BASEURL_DOMAIN(String pRODUCT_IMG_SERVER_BASEURL_DOMAIN) {
        PRODUCT_IMG_SERVER_BASEURL_DOMAIN = pRODUCT_IMG_SERVER_BASEURL_DOMAIN;
    }

    public void setALBUM_IMG_SERVER_BASEURL_DOMAIN(String aLBUM_IMG_SERVER_BASEURL_DOMAIN) {
        ALBUM_IMG_SERVER_BASEURL_DOMAIN = aLBUM_IMG_SERVER_BASEURL_DOMAIN;
    }

    public void setPHP_BASEURL_DOMAIN(String pHP_BASEURL_DOMAIN) {
        PHP_BASEURL_DOMAIN = pHP_BASEURL_DOMAIN;
    }

    public void setEHAIER_BASE_DOMAIN(String eHAIER_BASE_DOMAIN) {
        EHAIER_BASE_DOMAIN = eHAIER_BASE_DOMAIN;
    }

    public void setEHAIER_IMG_BASE_DOMAIN(String eHAIER_IMG_BASE_DOMAIN) {
        EHAIER_IMG_BASE_DOMAIN = eHAIER_IMG_BASE_DOMAIN;
    }

    public void setEHAIER_SEARCH_URL_DOMAIN(String eHAIER_SEARCH_URL_DOMAIN) {
        EHAIER_SEARCH_URL_DOMAIN = eHAIER_SEARCH_URL_DOMAIN;
    }

    public void setCDN_DOMAIN(String cDN_DOMAIN) {
        CDN_DOMAIN = cDN_DOMAIN;
    }

//    public void setMongoUtils(MongoUtils _mongoUtils) {
//        mongoUtils = _mongoUtils;
//    }
//
//    public static void setSystemService(SystemService systemService) {
//        DomainUrlUtil.systemService = systemService;
//    }

    /**
     * file方式获取图片访问地址
     * @param fileId
     * @param type
     * @return
     */
//    public static String getImageByFile(String fileId, String type) {
//        String imgUrl = "";
//        if (!StringUtil.isEmpty(fileId) && !StringUtil.isEmpty(type)) {
//            try {
//                imgUrl = mongoUtils.getImgUrl(fileId + ".png", type);
//                imgUrl= DomainUrlUtil.IMG_BASEURL_DOMAIN+imgUrl.substring(imgUrl.lastIndexOf("/")==-1?0:imgUrl.lastIndexOf("/")+1);
//            } catch (Exception e) {
//                log.error(
//                    "[shoppingmall-admin]-[DomainUrlUtil]-[getImageByFile] exception end &e:", e);
//                return "";
//            }
//        }
//        if (StringUtil.isEmpty(imgUrl)) {
//            return "";
//        }
//        return imgUrl;
//    }

    /**
     * thumb方式获取图片访问地址
     * @param fileId
     * @param type
     * @param width
     * @param height
     * @return
     */
//    public static String getImageByThumb(String fileId, String type, Integer width, Integer height) {
//        log.info("[商城后台]-[获取缩略图] getImageByThumb start: fileId=" + fileId + "&type=" + type
//                 + "&width=" + width + "&height=" + height);
//        String imgUrl = "";
//        if (!StringUtil.isEmpty(fileId) && !StringUtil.isEmpty(type)) {
//            try {
//                imgUrl = mongoUtils.getImgUrl(fileId + "?width=" + width + "&height=" + height,
//                    type);
//            } catch (Exception e) {
//                log.error(
//                    "[shoppingmall-admin]-[DomainUrlUtil]-[getImageByThumb] exception end &e:", e);
//                return "";
//            }
//        }
//        imgUrl = imgUrl == null ? "" : imgUrl;
//        log.info("[商城后台]-[获取缩略图] getImageByThumb end &return:" + imgUrl);
//        return imgUrl;
//
//    }
    /**
     * 根据id获取系统用户名
     * @return
     */
//    public static String getSysUserName(Integer sysUserId){
//
//      ServiceResult<SysUser> sysUserResult = systemService.getUserById(sysUserId);
//      if(sysUserResult.getSuccess()&&sysUserResult.getResult()!=null){
//          return sysUserResult.getResult().getUserName();
//      }
//      return "";
//
//    }
    public void setBDF_CLIENT_ID(String bDF_CLIENT_ID) {
        BDF_CLIENT_ID = bDF_CLIENT_ID;
    }

    public void setMEMBER_DOMAIN(String mEMBER_DOMAIN) {
        MEMBER_DOMAIN = mEMBER_DOMAIN;
    }

	public static void setCART_DOMAIN(String cART_DOMAIN) {
		CART_DOMAIN = cART_DOMAIN;
	}

	public static void setPAY_DOMAIN(String pAY_DOMAIN) {
		PAY_DOMAIN = pAY_DOMAIN;
	}

	public static void setSEARCH_DOMAIN(String sEARCH_DOMAIN) {
		SEARCH_DOMAIN = sEARCH_DOMAIN;
	}

	public static void setITEM_DOMAIN(String iTEM_DOMAIN) {
		ITEM_DOMAIN = iTEM_DOMAIN;
	}

	
    
    //    public static void setCLIENT_IP(String cLIENT_IP) {
    //        CLIENT_IP = cLIENT_IP;
    //    }

}
