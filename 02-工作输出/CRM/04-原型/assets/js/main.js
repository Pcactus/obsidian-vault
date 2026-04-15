// CRM 系统 - 主逻辑

// Mock 数据 - 线索列表
const mockLeads = [
  {
    id: '1',
    firstName: '伟',
    lastName: '张',
    title: '市场总监',
    department: '市场部',
    email: 'zhang.wei@example.com',
    phone: '010-88889999',
    mobile: '13800138001',
    company: '北京科技有限公司',
    industry: '科技/互联网',
    website: 'www.example.com',
    source: '网站',
    status: '新建',
    rating: 'Hot',
    assignedTo: '管理员',
    address: '北京市朝阳区科技园 A 座 101 室',
    createdAt: '2026-04-10 09:30:00'
  },
  {
    id: '2',
    firstName: '芳',
    lastName: '李',
    title: '采购经理',
    department: '采购部',
    email: 'li.fang@company.com',
    phone: '021-66668888',
    mobile: '13900139002',
    company: '上海贸易有限公司',
    industry: '贸易/零售',
    website: '',
    source: '电话',
    status: '已联系',
    rating: 'Warm',
    assignedTo: '管理员',
    address: '上海市浦东新区世纪大道 100 号',
    createdAt: '2026-04-09 14:20:00'
  },
  {
    id: '3',
    firstName: '强',
    lastName: '王',
    title: 'CEO',
    department: '',
    email: 'wang.qiang@startup.com',
    phone: '',
    mobile: '13700137003',
    company: '深圳创新科技有限公司',
    industry: '科技/互联网',
    website: 'www.startup.com',
    source: '推荐',
    status: '有意向',
    rating: 'Hot',
    assignedTo: '管理员',
    address: '深圳市南山区科技园',
    createdAt: '2026-04-08 11:15:00'
  },
  {
    id: '4',
    firstName: '敏',
    lastName: '刘',
    title: '运营总监',
    department: '运营部',
    email: 'liu.min@enterprise.com',
    phone: '0755-88886666',
    mobile: '13600136004',
    company: '广州 Enterprise 有限公司',
    industry: '制造业',
    website: '',
    source: '活动',
    status: '已评估',
    rating: 'Warm',
    assignedTo: '管理员',
    address: '广州市天河区珠江新城',
    createdAt: '2026-04-07 16:45:00'
  },
  {
    id: '5',
    firstName: '杰',
    lastName: '陈',
    title: '技术总监',
    department: '技术部',
    email: 'chen.jie@techcorp.com',
    phone: '',
    mobile: '13500135005',
    company: '杭州 TechCorp 公司',
    industry: '科技/互联网',
    website: 'www.techcorp.com',
    source: '网站',
    status: '已转换',
    rating: 'Hot',
    assignedTo: '管理员',
    address: '杭州市西湖区文一路',
    createdAt: '2026-04-06 10:00:00'
  }
];

// 状态映射
const statusMap = {
  '新建': 'tag-primary',
  '已联系': 'tag-default',
  '有意向': 'tag-success',
  '已评估': 'tag-warning',
  '已转换': 'tag-success',
  '已关闭': 'tag-danger'
};

// 评级映射
const ratingMap = {
  'Hot': 'tag-danger',
  'Warm': 'tag-warning',
  'Cold': 'tag-default'
};

// 来源选项
const sourceOptions = ['网站', '电话', '推荐', '活动', '其他'];

// 状态选项
const statusOptions = ['新建', '已联系', '有意向', '已评估', '已转换', '已关闭'];

// 行业选项
const industryOptions = ['科技/互联网', '制造业', '贸易/零售', '金融/保险', '医疗/健康', '教育/培训', '其他'];

// 获取线索列表
function getLeads(filter = {}) {
  let result = [...mockLeads];

  if (filter.search) {
    const keyword = filter.search.toLowerCase();
    result = result.filter(lead =>
      (lead.firstName + lead.lastName).includes(keyword) ||
      lead.company.toLowerCase().includes(keyword)
    );
  }

  if (filter.status && filter.status !== 'all') {
    result = result.filter(lead => lead.status === filter.status);
  }

  if (filter.source && filter.source !== 'all') {
    result = result.filter(lead => lead.source === filter.source);
  }

  return result;
}

// 根据 ID 获取线索
function getLeadById(id) {
  return mockLeads.find(lead => lead.id === id);
}

// 格式化日期
function formatDate(dateStr) {
  return dateStr;
}

// URL 参数解析
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}

// 设置 URL 参数
function setUrlParams(params) {
  const urlParams = new URLSearchParams(params);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}

// 显示消息提示
function showMessage(message, type = 'success') {
  const existingMsg = document.querySelector('.message');
  if (existingMsg) {
    existingMsg.remove();
  }

  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;

  const container = document.querySelector('.container') || document.querySelector('.container-fluid');
  if (container) {
    container.insertBefore(messageEl, container.firstChild);

    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }
}

// 确认对话框
function confirmAction(message) {
  return window.confirm(message);
}

// 表单验证
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    const errorEl = field.parentNode.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }

    if (!field.value.trim()) {
      isValid = false;
      const errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      errorDiv.textContent = '此项为必填项';
      field.parentNode.appendChild(errorDiv);
      field.style.borderColor = 'var(--error-color)';
    } else {
      field.style.borderColor = 'var(--border-color)';
    }

    // 邮箱验证
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = '邮箱格式不正确';
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'var(--error-color)';
      }
    }

    // 手机号验证
    if (field.name === 'mobile' && field.value) {
      const mobileRegex = /^1[3-9]\d{9}$/;
      if (!mobileRegex.test(field.value)) {
        isValid = false;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = '手机号格式不正确';
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'var(--error-color)';
      }
    }
  });

  return isValid;
}

// 本地存储工具
const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};

// 初始化完成事件
document.addEventListener('DOMContentLoaded', function() {
  // 导航栏激活状态
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar .nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
});
