module.exports = {
  // 路由
  router: {
    title_1: '首页',
    title_2: '系统设置',
    title_3: '部门设置',
    title_4: '人员管理',
    title_5: '人员列表',
    title_6: '访客管理',
    title_7: '下发记录',
    title_8: '设备管理',
    title_9: '设备列表',
    title_10: '在线视频',
    title_11: '抓拍管理',
    title_12: '抓拍记录',
    title_13: '考勤设置',
    title_14: '考勤班次',
    title_15: '考勤组',
    title_16: '考勤管理',
    title_17: '每日考勤',
    title_18: '月度考勤',
    title_19: '设备人员',
    title_20: '参数设置',
    title_21: '说明文档',
    title_22: '工作分类',
    title_23: '调度规则',
    title_24: '规则下发',
    title_rule_edit: '规则编辑',
    title_rule_deploy_tasks: "下发任务",
  },
  //操作按钮
  operation_btn: {
    btn_text_1: '添加',
    btn_text_2: '删除',
    btn_text_3: '确认修改',
    btn_text_4: '取 消',
    btn_text_5: '确 定',
    btn_text_6: '查询',
    btn_text_7: '新增',
    btn_text_8: '导出列表',
    btn_text_9: '批量导入',
    btn_text_10: '下载模板',
    btn_text_11: '批量下发',
    btn_text_12: '全员下发',
    btn_text_13: '批量删除',
    btn_text_14: '编辑',
    btn_text_15: '下发',
    btn_text_16: '上传',
    btn_text_17: '拍照',
    btn_text_18: '重置',
    btn_text_19: '成功',
    btn_text_20: '失败',
    btn_text_21: '下发中',
    btn_text_22: '添加设备',
    btn_text_23: '搜索设备',
    btn_text_24: '开闸',
    btn_text_25: '修改IP',
    btn_text_26: '批量导出',
    btn_text_27: '注册',
    btn_text_28: '默认',
    btn_text_29: '保存',
    btn_text_30: '导出',
    btn_text_31: '导出设置',
    btn_text_32: '全员注册',
    btn_text_33: '下发记录',
    btn_text_34: '刷新',
  },
  // 操作提示
  operation_tips: {
    tips_1: '请输入部门名称',
    tips_2: '长度在 1 到 10 个字符',
    tips_3: '请输入正确的11位电话号码',
    tips_4: '你确定要删除当前项吗?',
    tips_5: '删除失败!',
    tips_6: '删除成功!',
    tips_7: '获取编码失败!',
    tips_8: '添加成功!',
    tips_9: '添加失败!',
    tips_10: '修改成功!',
    tips_11: '修改失败!',
    tips_12: '正在加载...',
    tips_13: '请输入人员姓名',
    tips_14: '请输入人员编号',
    tips_15: '人员编号只能为数字和字母',
    tips_16: '请输入正确的邮箱',
    tips_17: '请选择部门',
    tips_18: '请选择工作分类',
    tips_19: '请上传头像',
    tips_20: '长度在 1 到 18 个字符',
    tips_21: '你确定要删除选中项吗?',
    tips_22: '未选中任何行',
    tips_23: '已下发',
    tips_24: '正在下发，请稍后...',
    tips_25: '下发失败!',
    tips_26: '保存成功!',
    tips_27: '保存失败!',
    tips_28: '您的输入的卡号大于32位的最大值，请确认是否属于64位!',
    tips_29: '号超过系统支持的最大值!',
    tips_30: '是',
    tips_31: '否',
    tips_32: '人员姓名不能为空',
    tips_33: '请选择授权时间',
    tips_34: '请上传头像',
    tips_35: '全部',
    tips_36: '成功',
    tips_37: '失败',
    tips_38: '下发中',
    tips_39: '状态每十秒刷新一次',
    tips_40: '开闸成功',
    tips_41: '开闸失败',
    tips_42: '提示',
    tips_43: '设置成功!',
    tips_44: '设置失败!',
    tips_45: '请选择需要删除的日期',
    tips_46: '该日期已被指定',
    tips_47: '补卡成功',
    tips_48: '补卡失败',
    tips_49: '确定将全部人员下发到所有设备吗？',

    tips_50: '提取人脸特征失败，须保证图像中有且仅有一张人脸',
    tips_51: '解码图片失败',
    tips_52: '归一化图像失败',
    tips_53: '提取特征失败',
    tips_54: '人脸尺寸太小，人脸轮廓必须大于96*96',
    tips_55: '人像质量太差不满足注册条件',
    tips_56: '图像中人脸数不为1',
    tips_57: '图像中人脸不完整',
    tips_58: '人脸俯仰角太大',
    tips_59: '人脸侧偏角太大',
    tips_60: '人脸不正',
    tips_61: '张嘴幅度过大',
    tips_62: '光照不均匀',
    tips_63: '图片不能超过4M',
    tips_64: '人脸图像不符合下发条件',

    tips_65: '是否开始新手引导?',
    tips_66: '上一步',
    tips_67: '下一步',
    tips_68: '进入页面',
    tips_69: '查看抓拍记录',
    tips_70: '搜索设备',
    tips_71:
      '步骤1：点击《搜索设备》进行自动搜索，然后点击《添加》按钮添加设备。',
    tips_72: '新增人员',
    tips_73: '步骤2：点击《新增》按钮添加单个人员信息。',
    tips_74: '步骤3：进入页面查看设备抓拍记录。',
    tips_75: '退出',
    tips_76: '新手引导',

    tips_77: '必须有一个默认考勤组',
    tips_78: '不能超过最大字符长度',
    tips_79: '确定将全部人员下发到该设备吗？',
    auto_refresh_on: '开启自动刷新列表',
    auto_refresh_off: '关闭自动刷新列表',
    auto_refresh: '自动刷新',
    issue_finished: '下发已完成'
  },
  // 首页
  home: {
    text_1: '注册人数',
    text_2: '设备数量',
    text_3: '在线设备数',
    text_4: '今日出勤数',
    text_5: '迟到',
    text_6: '早退',
    text_7: '请假',
    text_8: '我的设备',
    text_9: '抓拍记录',
    text_10: '七日通勤量',
    text_11: '今日进入人数',
  },
  // 系统设置
  system: {
    text_1: '部门',
    text_2: '部门详情',
    text_3: '工作分类',
    text_4: '添加部门',
    text_5: '部门',
    text_6: '添加一级部门',
    text_7: '下发方式',
    text_8: '编号下发',
    text_9: 'ID下发',
    text_10: '选择<编号下发>时新增人员编号必须填写为身份证号码',
    text_11: '*: 重新启动程序生效',
    text_celsius: "摄氏度",
    text_fahreinheit: "华氏度",


    title_1: '编码',
    title_2: '部门名称',
    title_3: '部门描述',
    title_4: '电话',
    title_5: '地址',
    title_6: '部门编码',
    title_7: '部门名称',
    title_8: '部门描述',
    title_9: '电话',
    title_10: "自定义系统名称*",
    title_11: "自定义系统简称*",
    title_12: "隐藏页面*",
    title_temperature: "温度显示",

  },
  //人员管理
  personnel: {
    text_1: '姓名',
    text_2: '编号',
    text_3: '电话号码',
    text_4: '人员信息',
    text_5: '下发设备',
    text_6: '授权起始时间',
    text_7: '至',
    text_8: '授权起始时间',
    text_9: '授权结束时间',
    text_10: '是否下发',
    text_11: '是/否',
    text_12: '是',
    text_13: '授权时间区间',
    text_14: '状态',
    text_15: '授权结束时间',
    text_16: '角色',
    text_17: '状态',

    title_1: '头像',
    title_2: '位',
    title_3: 'IP地址',
    title_4: '部门',
    title_5: '人员编号',
    title_6: '工作分类',
    title_7: '已下发总数',
    title_8: '相机总数',
    title_9: '操作',
    title_10: '门禁卡号',
    title_11: '邮箱',
    title_12: '照片',
    title_13: '设备名称',
    title_14: '设备编号',
    title_15: '序号',
    title_16: '同步时间',
    title_17: '人员来源',
    title_18: '自定义',
    title_19: '授权开始',
    title_20: '授权结束',
    authorized_time: '授权时间',

    pl_1: '人员姓名',
    pl_2: '电子邮箱',
    pl_3: '请选择工作部门',
    pl_4: '请选择工作分类',
    pl_5: '全部',
    pl_6: '时间',
    pl_7: '请选择下一级选项',
    pl_8: '人员角色',
    pl_9: '人员状态',
    pl_10: '普通人员',
    pl_11: '白名单人员',
    pl_12: '黑名单人员',
    pl_13: '所有人员',
    pl_14: '无',
    pl_15: '请输入身份证号',
    pl_16: '编号中请输入正确的身份证号',
    pl_17: '程序错误',
    pl_18: '正在注册...',
    pl_19: '是否注册全部人员信息，共',
    pl_20: '人',
    pl_21: '状态备注',
    pl_22: '韦根卡号不支持模糊匹配',
    pl_23: '图像解码失败',
    pl_24: '图像太大，用于提取特征的jpg图像不能超过10M',
    pl_25: '归一化图像失败',
    pl_26: '人脸尺寸太小',
    pl_27: '人像质量太差',
    pl_28: '图像中人脸数不为1',
    pl_29: '图像中人脸不完整',
    pl_30: '人脸重复（注册时发现相同人脸已经存在于库中）',
    pl_31: '数据同步',
    pl_32: '手动添加',
    pl_33: '批量导入',
    pl_34: '错误代码:',
    pl_35: '自定义字段'
  },
  //设备管理
  device: {
    text_1: '序号',
    text_2: '设备编号',
    text_3: '设备名称',
    text_4: 'IP地址',
    text_5: '状态',
    text_6: '操作',
    text_7: '在线',
    text_8: '离线',
    text_9: '修改设备',
    text_10: '添加设备',
    text_11: '名称',
    text_12: '设备IP',
    text_13: '设备型号',
    text_14: 'IP信息',
    text_15: '子网掩码',
    text_16: '默认网关',
    text_17: 'IP地址不能为空!',
    text_18: '请填写正确的ipv4地址',
    text_19: '请输入设备名称',
    text_20: '子网掩码不能为空!',
    text_21: '默认网关不能为空!',
    text_22: '请填写正确的网关',
    text_23: '请填写正确的子网掩码',
    text_24: 'IP地址已存在，不能重复添加！',
    text_25: '设备列表',
    text_26: '播放视频',
    text_27: '设置',
    text_28: '开',
    text_29: '允许注册重复',
    text_30: '活体检测',
    text_31: '体温检测',
    text_32: '体温预警阀值',
    text_33: '请输入体温数值',
    text_34: '补光模式',
    text_35: '常开',
    text_36: '自动控制',
    text_37: '常闭',
    text_38: '补光灵敏度',
    text_39: '低',
    text_40: '中',
    text_41: '高(仅用于自动模式)',
    text_42: '补光灯亮度',
    text_43: '自动息屏',
    text_44: '关',
    text_45: '息屏模式',
    text_46: '媒体展示模式',
    text_47: '设备未连接',
    text_48: '设置成功',
    text_49: '设置失败',
    text_50: '请输入正确的温度',
    text_51: '此设备不支持参数设置',
    text_52: '陌生人上传',
    text_53: '音量大小',
    text_54: 'DNS地址',
    text_55: 'DNS地址不能为空!',
    text_56: '请填写正确的DNS地址',
    text_57: '编辑设备IP信息',
    text_58: '设备时间同步方式',
    text_59: '外网(NTP)同步',
    text_60: '本机同步',
    text_61: '注：设备与本机必须在同一网段',
    text_62: '指令已发送',
    text_63: '本机ip地址',
    text_64: '进出',
    text_65: '未定义',
    text_66: '进',
    text_67: '出',
    username: '账号',
    password: '密码',

  },
  //抓拍管理
  snapshot: {
    text_1: '姓名',
    text_2: '人员姓名',
    text_3: '设备编号',
    text_4: '抓拍时间',
    text_5: '至',
    text_6: '抓拍起始时间',
    text_7: '抓拍结束时间',
    text_8: '陌生人',
    text_9: '请选择',
    text_10: '是',
    text_11: '健康码状态',
    text_12: '绿码',
    text_13: '黄码',
    text_14: '红码',
    text_15: '特写图',
    text_16: '体温',
    text_17: '身份证号码',
    text_18: '门禁卡号',
    text_19: '设备名称',
    text_20: '是否佩戴口罩',
    text_21: '否',
    text_22: '头像',
    text_23: '操作',
    text_24: '人员信息',
    text_25: '人员编号',
    text_26: '电话号码',
    text_27: '位',
    text_28: '邮箱',
    text_29: '电子邮箱',
    text_30: '部门',
    text_31: '请选择工作部门',
    text_32: '工作分类',
    text_33: '请选择工作分类',
    text_34: '照片',
    text_35: '导出时间范围',
    text_36: '起始时间',
    text_37: '结束时间',
    text_38: '健康码',
    text_39: '编号',
    text_40: '批量导出',
    text_41: '导出时间范围',
    text_42: '导出记录必须选择日期范围。',
    text_43: '健康码类型',
    text_44: '行程信息',
    text_45: '健康码备注',
    text_46: '全部',
    text_47: '显示健康码',
    text_48: '显示是否戴口罩',
    text_49: 'ID',
    text_50: '人员类别',
    text_51: '白名单',

  },
  //考勤管理
  attendance: {
    text_1: '姓名',
    text_2: '人员姓名',
    text_3: '旷工',
    text_4: '请选择',
    text_5: '是',
    text_6: '迟到',
    text_7: '早退',
    text_8: '考勤日期',
    text_9: '至',
    text_10: '开始日期',
    text_11: '结束日期',
    text_12: '部门',
    text_13: '人员编号',
    text_14: '班次信息',
    text_15: '打卡信息',
    text_16: '上班',
    text_17: '请假',
    text_18: '缺卡',
    text_19: '下班',
    text_20: '体温',
    text_21: '迟到(分钟)',
    text_22: '补卡信息',
    text_23: '补卡类型',
    text_24: '正常',
    text_25: '补卡时间',
    text_26: '任意时间点',
    text_27: '导出设置',
    text_28: '默认',
    text_29: '设置',
    text_30: '没有查询到考勤信息...',
    text_31: '补卡时间不能小于上班时间',
    text_32: '下班时间不能小于补卡时间',
    text_33: '当前时间没有打卡信息',
    text_34: '次日',
    text_35: '打卡信息2',

    text_40: '考勤月份',
    text_41: '选择月',
    text_42: '日期',
    text_43: '出勤(天)',
    text_44: '迟到次数/总时长(分钟)',
    text_45: '早退次数/总时长(分钟)',
    text_46: '旷工天数',
    text_47: '请先选择查询年月',
    text_48: '状态',

    text_50: '星期天',
    text_51: '星期一',
    text_52: '星期二',
    text_53: '星期三',
    text_54: '星期四',
    text_55: '星期五',
    text_56: '星期六',

    text_daily_report: 'Daily Attendance',
  },
  //考勤设置
  attendanceSet: {
    text_1: '新增',
    text_2: '创建时间',
    text_3: '班次名称',
    text_4: '班次时长',
    text_5: '工作时段一',
    text_6: '工作时段二',
    text_7: '工作时段三',
    text_8: '休息时间段',
    text_9: '操作',
    text_10: '班次信息',
    text_11: '班次',
    text_12: '打卡时间段',
    text_13: '一段/天',
    text_14: '二段/天',
    text_15: '三段/天',
    text_16: '上下班时间段',
    text_17: '至',
    text_18: '开始时间',
    text_19: '结束时间',
    text_20: '选择时间范围',
    text_21: '出勤时长',
    text_22: '小时',
    text_23: '上班有效打卡区间',
    text_24: '下班有效打卡区间',
    text_25: '请输入班次名称',
    text_26: '请选择上班时间段',
    text_27: '请选择休息时间段',
    text_28: '有效打卡区间',
    text_29: '次日',

    text_30: '班组名',
    text_31: '类型',
    text_32: '按周循环排班',
    text_33: '排班详情',
    text_34: '工作',
    text_35: '周一',
    text_36: '周二',
    text_37: '周三',
    text_38: '周四',
    text_39: '周五',
    text_40: '周六',
    text_41: '周日',
    text_42: '休息',
    text_43: '人员数目',
    text_44: '是否默认',
    text_45: '是',
    text_46: '否',
    text_47: '考勤组',
    text_48: '班组名称',
    text_49: '选择人员',
    text_50: '人',
    text_51: '特殊日期',
    text_52: '不用打卡日期',
    text_53: '必须打卡日期',
    text_54: '选择',
    text_55: '姓名',
    text_56: '人员编号',
    text_57: '部门',
    text_58: '考勤日期',
    text_59: '日期类型',
    text_60: '选择日期',
    text_61: '选择班次',
    text_62: '请输入班组名称',
    text_63: '请选择考勤日期',
    text_64: '请选择班次',
    text_65: '排班类型',
    text_66: '更多',
    text_67: '输入名字、编号、部门查询',
    text_68: '注意：无法移出人员，只能将其加入另外的考勤组',

    text_70: '请选择上班时间',
    text_71: '请选择下班时间',
    text_72: '白班',
    text_73: '跨夜',
    text_74: '班次类型',
    text_75: '休息开始时间不能小于上班时间',
    text_76: '休息开始时间不能在下班时间之后',
    text_77: '休息结束时间不能在下班时间之后',
    text_78: '上班有效打卡结束时间在上班时间之后至下班时间之前',
    text_79: '上班有效打卡开始时间不能超过上班时间',
    text_80: '下班有效打卡开始时间在上班时间之后至下班时间之前',
    text_81: '下班有效打卡结束时间不能早于下班时间',
    text_82: '',
    text_83: '下班有效打卡结束时间在时段1下班时间至时段2上班时间之间',
    text_84: '二时段的时间范围应在一时段之后',
    text_85: '上班有效打卡开始时间应大于上时段1结束时间小于时段2开始时间',
    text_86: '上班有效打卡结束时间应大于时段2上班时间小于时段2下班时间',
    text_87: '',
    text_88: '下班有效打卡开始时间应大于上班时间小于下班时间',
  },
  //调度规则
  accessControl: {
    addWeekRule: '添加周调度规则',
    addDayRule: '添加天调度规则',
    name: '名称',
    inputTimeSlot: '请输入时间段',
    timeSlotPlaceHolder: '12:00-13:00 或 12001300',
    addEmployeeTypeDeployRule: '添加工作分类下发规则',
    addDepartmentDeployRule: '添加部门下发规则',
    addEmployeeDeployRule: '添加人员下发规则',
    generateDeployTask: '生成下发任务',
    personDepartmentEmployeeType: '人员/部门/工作分类',
    device: '设备',
    rule: '规则',
    pleaseChooseEmployeeType: '请选择工作分类',
    pleaseChooseDepartment: '请选择部门',
    pleaseChooseDevice:'请选择设备',
    pleaseChoose: '请选择',
    pleaseInputName: '请输入人员姓名',
    noteTitle: '重要提示',
    notes: 
    '1. 规则下发顺序：工作分类 -> 部门 -> 个人员工, 即如果同时添加了三类下发规则，那么最先下发工作分类，然后是部门，最后是个人员工，后下发的规则覆盖先下发的规则。2. 推荐添加规则的顺序：工作分类 -> 部门 -> 个人员工。3. 对于部门下发规则，不会查找该部门的上下级部门的从属关系，即某个员工如果属于A部门，那么当添加部门下发规则时，必须选择A部门，选择A部门的上级不会下发该员工。',
    refresh: '刷新',
    createdTime: '创建时间',
    progress: '进度',
    total:'总数',
    success: '成功',
    fail: '失败',
    state: '状态',
    finished: '完成',
    selectedItemAlreadyExists: '选择的项目已经存在',
    thereIsUnfinishedTask: '有下发任务正在运行， 无法继续添加',
    taskCreatedSuccessfully: '创建下发任务成功',
    noAccess: '不得进出',
    fullAccess: '不限制进出',
    defaultAccess: '默认规则:',

  }
}
