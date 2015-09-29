package com.ehaier.shoppingmall.otms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * Created by jiangpeng on 15-8-25.
 */
@JsonIgnoreProperties({ "row", "page","total","beginNum","records","rows" })
public class SearchModel extends Pager implements Serializable{
}
