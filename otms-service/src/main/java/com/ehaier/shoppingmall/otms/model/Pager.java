package com.ehaier.shoppingmall.otms.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/*******************************************************
 * Copyright 2014 SOFTEC Corporation. All Rights Reserved.<br/>
 * Description:用于分页的page对象<br/>
 * CreateTime:2014年7月2日下午5:07:51<br/>
 * CreateUser:jiangpeng<br/>
 ********************************************************/
public class Pager<T> implements Serializable {

	private static final long serialVersionUID = -2714564306514258225L;

	// Fields
	private Integer row;// 每页行数
	private Integer page; // 当前页数
	private Integer total;// 总页数
	private Integer records; // 总记录数
	private Integer beginNum;// 起始行号
	private List<T> rows = new ArrayList<T>(); // 当前页记录

	public Pager() {

	}

	// Constructors
	public Pager(Integer row, Integer page, Integer records) {
		this.row = row;
		this.page = page;
		this.records = records;
		beginNum = row * (page - 1) + 1;
		total = records % row == 0 ? records / row : (records / row) + 1;
	}

	public Integer getRow() {
		return row;
	}

	public void setRow(Integer row) {
		this.row = row;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getRecords() {
		return records;
	}

	public void setRecords(Integer records) {
		this.records = records;
	}

	public Integer getBeginNum() {
		return beginNum;
	}


	public  List<T> getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

}
