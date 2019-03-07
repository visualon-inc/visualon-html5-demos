var fccUI = Object.create(CommonUI);

// do player operation
fccUI.doSetSubtitleStyle = function(enableFcc, fccProperty) {
  var subStyle = {
    enable: enableFcc
  };
  switch (fccProperty.name) {
    case 'background_color':
      {
        subStyle.fontBackgroundColor = {};
        subStyle.fontBackgroundColor.enable = fccProperty.enable;
        subStyle.fontBackgroundColor.value = fccProperty.currValue;
      }
      break;
    case 'background_opacity':
      {
        subStyle.fontBackgroundOpacity = {};
        subStyle.fontBackgroundOpacity.enable = fccProperty.enable;
        subStyle.fontBackgroundOpacity.value = parseFloat(fccProperty.currValue) / 100;
      }
      break;
    case 'font_color':
      {
        subStyle.fontColor = {};
        subStyle.fontColor.enable = fccProperty.enable;
        subStyle.fontColor.value = fccProperty.currValue;
      }
      break;
    case 'font_opacity':
      {
        subStyle.fontOpacity = {};
        subStyle.fontOpacity.enable = fccProperty.enable;
        subStyle.fontOpacity.value = parseFloat(fccProperty.currValue) / 100;
      }
      break;
    case 'font_family':
      {
        subStyle.fontFamily = {};
        subStyle.fontFamily.enable = fccProperty.enable;
        subStyle.fontFamily.value = fccProperty.currValue;
      }
      break;
    case 'font_edge_type':
      {
        subStyle.fontEdgeType = {};
        subStyle.fontEdgeType.enable = fccProperty.enable;
        subStyle.fontEdgeType.value = fccProperty.currValue;
      }
      break;
    case 'font_edge_color':
      {
        subStyle.fontEdgeColor = {};
        subStyle.fontEdgeColor.enable = fccProperty.enable;
        subStyle.fontEdgeColor.value = fccProperty.currValue;
      }
      break;
    case 'font_edge_opacity':
      {
        subStyle.fontEdgeOpacity = {};
        subStyle.fontEdgeOpacity.enable = fccProperty.enable;
        subStyle.fontEdgeOpacity.value = parseFloat(fccProperty.currValue) / 100;
      }
      break;
    case 'font_size':
      {
        subStyle.fontSize = {};
        subStyle.fontSize.enable = fccProperty.enable;
        subStyle.fontSize.value = fccProperty.currValue;
      }
      break;
    case 'font_bold':
      {
        subStyle.fontBold = {};
        subStyle.fontBold.enable = fccProperty.enable;
        subStyle.fontBold.value = (fccProperty.currValue === "true") ? true : false;
      }
      break;
    case 'font_underline':
      {
        subStyle.fontUnderline = {};
        subStyle.fontUnderline.enable = fccProperty.enable;
        subStyle.fontUnderline.value = (fccProperty.currValue === "true") ? true : false;
      }
      break;
    case 'font_italic':
      {
        subStyle.fontItalic = {};
        subStyle.fontItalic.enable = fccProperty.enable;
        subStyle.fontItalic.value = (fccProperty.currValue === "true") ? true : false;
      }
      break;
    case 'window_color':
      {
        subStyle.windowColor = {};
        subStyle.windowColor.enable = fccProperty.enable;
        subStyle.windowColor.value = fccProperty.currValue;
      }
      break;
    case 'window_color_opacity':
      {
        subStyle.windowOpacity = {};
        subStyle.windowOpacity.enable = fccProperty.enable;
        subStyle.windowOpacity.value = parseFloat(fccProperty.currValue) / 100;
      }
      break;
    case 'bounding_box':
      {
        subStyle.boundingBox = {};
        subStyle.boundingBox.enable = fccProperty.enable;
        subStyle.boundingBox.value = {
          left: fccProperty.currValue[0].toString() + '%',
          top: fccProperty.currValue[1].toString() + '%',
          right: fccProperty.currValue[2].toString() + '%',
          bottom: fccProperty.currValue[3].toString() + '%'
        };
      }
      break;
    case 'horizontal_position':
      {
        subStyle.fontHorzPosition = {};
        subStyle.fontHorzPosition.enable = fccProperty.enable;
        subStyle.fontHorzPosition.value = fccProperty.currValue;
      }
      break;
    case 'vertical_position':
      {
        subStyle.fontVertPosition = {};
        subStyle.fontVertPosition.enable = fccProperty.enable;
        subStyle.fontVertPosition.value = fccProperty.currValue;
      }
      break;
    default:
      break;
  }

  this.player_.setSubtitleStyles(subStyle);
};

fccUI.onFccMenuClick = function(e) {
  this.destroySettingsMenu();
  this.createFccMenu();
};

// fcc item ui events
fccUI.onFccBack = function(e) {
  if (e.target.nodeName === 'INPUT') {
    return;
  }

  this.destroySettingsMenu();
  this.createSettingsMenu();
};

fccUI.onFccMenuHeaderChecked = function(e) {
  var newValue = e.target.checked;
  var subStyle = {
    enable: newValue
  };
  printLog('fcc menu header checked' +
    ', enable: ' + subStyle.enable, LOG_DEBUG);
  if (this.player_) {
    this.settingMenuContext.isEnableFCC = newValue;
    this.player_.setSubtitleStyles(subStyle);
  }
};

fccUI.onFccItemBlur = function(e) {
  printLog('fcc item blur', LOG_DEBUG);

  // For IE11 only
  var prevFocus;
  var nextFocus;
  if (this.browser === 'IE') {
    prevFocus = e.target;
    nextFocus = document.activeElement;
  } else {
    prevFocus = e.target;
    nextFocus = e.relatedTarget;
  }

  if (nextFocus && (nextFocus.className.indexOf('vop-panel-header') !== -1 ||
      nextFocus.className.indexOf('vop-panel-title') !== -1 ||
      nextFocus.className.indexOf('vop-menuitem') !== -1 ||
      nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
      nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
      nextFocus.className.indexOf('vop-fccitem-checkbox') !== -1 ||
      nextFocus.className.indexOf('vop-popup') !== -1 ||
      nextFocus === this.vopSettingsBtn)) {
    // do nothing, because onFccItemClick will handle this click event.
  } else if (!this.vopPlayer.contains(nextFocus)) {
    this.destroySettingsMenu();
    this.onPlayerMouseleave();
  } else if (this.vopControlBar.contains(nextFocus) ||
    this.vopLogo.contains(nextFocus)) {
    this.destroySettingsMenu();
  } else {
    this.destroySettingsMenu();
    this.noPlayerClick = true;
  }
};

fccUI.onFccItemClick = function(e) {
  printLog('fcc item click, name: ' + e.currentTarget.dataset.name, LOG_DEBUG);

  var nextFocus = e.currentTarget;
  var fccItemName = nextFocus.dataset.name;
  if (e.target.className.indexOf('vop-fccitem-checkbox') !== -1) {
    return;
  }

  this.destroySettingsMenu();
  this.createFccItemMenu(fccItemName);
};

fccUI.onFccItemChecked = function(e) {
  var propertyName = e.target.parentNode.dataset.name;
  var propertyEnable = e.target.checked;
  printLog('fcc item checked' +
    ', name: ' + e.target.parentNode.dataset.name +
    ', checked: ' + e.target.checked,
    LOG_DEBUG);

  var fccProperty = null;
  for (var i = 0; i < this.settingMenuContext.fccPropertyList.length; i++) {
    var fccProperty = this.settingMenuContext.fccPropertyList[i];
    if (fccProperty.name === propertyName) {
      fccProperty.enable = propertyEnable;
      break;
    }
  }

  this.doSetSubtitleStyle(this.settingMenuContext.isEnableFCC, fccProperty);
};

// fcc property item ui events
fccUI.onFccPropertyItemBack = function(e) {
  this.destroySettingsMenu();
  this.createFccMenu();
};

fccUI.onFccPropertyItemBlur = function(e) {
  printLog('fcc property item blur', LOG_DEBUG);

  // For IE11 only
  var prevFocus;
  var nextFocus;
  if (this.browser === 'IE') {
    prevFocus = e.target;
    nextFocus = document.activeElement;
  } else {
    prevFocus = e.target;
    nextFocus = e.relatedTarget;
  }

  // need do a specia process, if click input of a fcc property item
  if (nextFocus && nextFocus.className.indexOf('vop-fccpropertyitem-input') !== -1) {
    return;
  }

  // general process to fcc property item blur event
  if (nextFocus && (nextFocus.className.indexOf('vop-panel-header') !== -1 ||
      nextFocus.className.indexOf('vop-panel-title') !== -1 ||
      nextFocus.className.indexOf('vop-menuitem') !== -1 ||
      nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
      nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
      nextFocus.className.indexOf('vop-fccitem-checkbox') !== -1 ||
      nextFocus.className.indexOf('vop-popup') !== -1 ||
      nextFocus === this.vopSettingsBtn)) {
    // do nothing, because onFccItemClick will handle this click event.
  } else if (!this.vopPlayer.contains(nextFocus)) {
    this.destroySettingsMenu();
    this.onPlayerMouseleave();
  } else if (this.vopControlBar.contains(nextFocus) ||
    this.vopLogo.contains(nextFocus)) {
    this.destroySettingsMenu();
  } else {
    this.destroySettingsMenu();
    this.noPlayerClick = true;
  }
};

fccUI.onFccPropertyItemClick = function(e) {
  var propertyName = this.vopPanelMenu.dataset.name;
  var propertyValue = '';

  // find the target fcc property data first
  var fccProperty = null;
  for (var i = 0; i < this.settingMenuContext.fccPropertyList.length; i++) {
    fccProperty = this.settingMenuContext.fccPropertyList[i];
    if (fccProperty.name === propertyName) {
      break;
    }
  }
  if (!fccProperty) {
    return;
  }
  propertyValue = fccProperty.currValue;
  // need do a special process for 'bounding_box'
  if (propertyName === 'bounding_box') {
    if (e.target.className.indexOf('vop-fccpropertyitem-input') !== -1) {
      var label = e.currentTarget.querySelector('.vop-menuitem-label');
      var value = e.target.valueAsNumber;
      switch (label.innerText) {
        case 'Left':
          {
            propertyValue[0] = value;
          }
          break;
        case 'Top':
          {
            propertyValue[1] = value;
          }
          break;
        case 'Right':
          {
            propertyValue[2] = value;
          }
          break;
        case 'Bottom':
          {
            propertyValue[3] = value;
          }
          break;
        default:
          break;
      }
    } else {
      return;
    }
  } else {
    propertyValue = e.currentTarget.dataset.id;
  }
  fccProperty.currValue = propertyValue;

  printLog('fcc property item click' +
    ', name: ' + propertyName +
    ', value: ' + propertyValue,
    LOG_DEBUG);

  this.updatePanelMenuUI(fccProperty.currValue);
  this.doSetSubtitleStyle(this.settingMenuContext.isEnableFCC, fccProperty);
};

fccUI.createFccItemMenu = function(name) {
  // fcc property title
  var header = this.createHeaderItemUI(name, this.onFccPropertyItemBack.bind(this));
  this.vopPanel.insertBefore(header, this.vopPanelMenu);

  var focusItem = null;
  for (var i = 0; i < this.settingMenuContext.fccPropertyList.length; i++) {
    var fccProperty = this.settingMenuContext.fccPropertyList[i];
    if (fccProperty.name === name) {

      for (var j = 0; j < fccProperty.values.length; j++) {
        var propertyValue = fccProperty.values[j];

        var menuitem = this.createRadioMenuItem(propertyValue,
          this.onFccPropertyItemBlur.bind(this),
          this.onFccPropertyItemClick.bind(this));
        menuitem.dataset.id = propertyValue;
        if (propertyValue == fccProperty.currValue) {
          menuitem.setAttribute('aria-checked', 'true');
        }

        // need to add input field for 'bounding_box'
        if (fccProperty.name === 'bounding_box') {
          menuitem.removeAttribute('role');

          var input = document.createElement('input');
          input.type = 'range';
          input.min = '0';
          input.max = '100';
          input.valueAsNumber = fccProperty.currValue[j];
          input.dataset.id = propertyValue;
          input.setAttribute('class', 'vop-fccpropertyitem-input');
          menuitem.appendChild(input);
        }

        //
        this.vopPanelMenu.dataset.name = fccProperty.name;
        this.vopPanelMenu.appendChild(menuitem);

        if (!focusItem) {
          focusItem = menuitem;
        }
      }
      break;
    }
  }
  this.settingMenuContext.currMenu = 'fcc_property_menu';
  this.vopSettingsMenu.style.display = 'block';
  focusItem.focus();
};

fccUI.createFccMenuHeader = function(text, cb) {
  var header = document.createElement('div');
  header.setAttribute('tabindex', 0);
  header.setAttribute('class', 'vop-panel-header');
  header.addEventListener('click', cb);

  var title = document.createElement('button');
  title.setAttribute('class', 'vop-panel-title');
  title.innerText = text;
  title.style.width = 'auto';

  var check = document.createElement('input');
  check.setAttribute('type', 'checkBox');
  check.style = 'width:18px;height:18px;vertical-align:middle;';
  check.checked = this.settingMenuContext.isEnableFCC;
  check.onmousedown = function(e) {
    // toggle checkstate logic
    e.preventDefault(); // this would stop mousedown from continuing and would not focus
  };
  check.addEventListener('change', this.onFccMenuHeaderChecked.bind(this));

  var span = document.createElement('span');
  span.innerText = 'Enable';

  header.appendChild(title);
  header.appendChild(check);
  header.appendChild(span);

  return header;
};

fccUI.createFccMenu = function() {
  // The fcc menu html:
  // <div class="vop-panel-menu">
  //     <div class="vop-menuitem" role="menuitem" aria-haspopup="true" onclick="onFccItemClick(event)">
  //        <div class="vop-menuitem-label">
  //            Font Family
  //        </div>
  //        <div class="vop-menuitem-content">
  //           Default
  //        </div>
  //     </div>
  //     <div class="vop-menuitem" role="menuitem" aria-haspopup="true" onclick="onFccItemClick(event)">
  //         <div class="vop-menuitem-label">
  //             Font Color
  //         </div>
  //         <div class="vop-menuitem-content">
  //           Yellow
  //         </div>
  //     </div>
  // </div>

  printLog('create fcc menu', LOG_DEBUG);

  // remove all children of this.vopPanelMenu
  this.destroySettingsMenu();

  // fcc property title
  var header = this.createFccMenuHeader('Subtitles Optoins', this.onFccBack.bind(this));
  this.vopPanel.insertBefore(header, this.vopPanelMenu);

  // fcc property item
  var firstItem = null;
  for (var i = 0; i < this.settingMenuContext.fccPropertyList.length; i++) {
    var fcc = this.settingMenuContext.fccPropertyList[i];

    var menuitem = document.createElement('div');
    menuitem.dataset.name = fcc.name;
    menuitem.setAttribute('class', 'vop-menuitem');
    menuitem.setAttribute('aria-haspopup', 'true');
    menuitem.setAttribute('tabindex', '0');
    menuitem.onblur = this.onFccItemBlur.bind(this);
    menuitem.addEventListener('click', this.onFccItemClick.bind(this));

    var check = document.createElement('input');
    check.checked = fcc.enable;
    check.setAttribute('type', 'checkBox');
    check.setAttribute('class', 'vop-fccitem-checkbox');
    check.onmousedown = function(e) {
      // Toggle checkstate logic
      e.preventDefault(); // this would stop mousedown from continuing and would not focus
    };
    check.addEventListener('change', this.onFccItemChecked.bind(this));

    var label = document.createElement('div');
    label.innerText = fcc.name;
    label.setAttribute('class', 'vop-menuitem-label');

    var content = document.createElement('div');
    content.innerText = fcc.currValue;
    content.setAttribute('class', 'vop-menuitem-content');

    menuitem.appendChild(check);
    menuitem.appendChild(label);
    menuitem.appendChild(content);
    this.vopPanelMenu.appendChild(menuitem);

    if (!firstItem) {
      firstItem = menuitem;
    }
  }

  this.vopSettingsMenu.style.display = 'block';
  this.settingMenuContext.currMenu = 'fcc_menu';
  if (firstItem) {
    firstItem.focus();
  }
};

fccUI.doCreateSettingsMenu = function() {
  var items = CommonUI.doCreateSettingsMenu.call(this);

  var label, content, contentText;

  // create fcc menuitem
  var fccMenuitem = document.createElement('div');
  fccMenuitem.setAttribute('class', 'vop-menuitem');
  fccMenuitem.setAttribute('role', 'menuitem');
  fccMenuitem.setAttribute('aria-haspopup', 'true');
  fccMenuitem.setAttribute('tabindex', '0');
  fccMenuitem.onblur = this.onMainMenuBlur.bind(this);

  label = document.createElement('div');
  label.setAttribute('class', 'vop-menuitem-label');
  label.innerText = 'Subtitle';

  content = document.createElement('div');
  content.setAttribute('class', 'vop-menuitem-content');
  contentText = document.createElement('span');
  contentText.setAttribute('class', 'vop-menuitem-content-text');
  contentText.innerText = 'Options';
  content.appendChild(contentText);

  fccMenuitem.appendChild(label);
  fccMenuitem.appendChild(content);
  fccMenuitem.addEventListener('click', this.onFccMenuClick.bind(this));

  items.fccMenuitem = fccMenuitem;

  return items;
};

fccUI.createSettingsMenu = function() {
  // remove all children of vopPanelMenu
  this.destroySettingsMenu();

  var items = this.doCreateSettingsMenu();
  var focusItem = null;
  if (items.qualityMenuitem) {
    this.vopPanelMenu.appendChild(items.qualityMenuitem);
  }
  if (items.audioMenuitem) {
    this.vopPanelMenu.appendChild(items.audioMenuitem);
  }
  if (items.fccMenuitem) {
    this.vopPanelMenu.appendChild(items.fccMenuitem);
  }

  //
  if (items.qualityMenuitem) {
    focusItem = items.qualityMenuitem;
  } else if (items.audioMenuitem) {
    focusItem = items.audioMenuitem;
  }

  this.vopSettingsMenu.style.display = 'block';
  focusItem.focus();

  this.settingMenuContext.currMenu = 'main_menu';
};

fccUI.onSettingClick = function() {
  if (!this.flagPlayerInited) {
    return;
  }

  printLog('setting click' +
    ', currMenu: ' + this.settingMenuContext.currMenu,
    LOG_DEBUG);

  if (this.subtitlesMenuContext.currMenu !== 'none') {
    this.destroySettingsMenu();
  }

  if (this.settingMenuContext.currMenu === 'none') {
    this.createSettingsMenu();
  } else {
    this.destroySettingsMenu();
  }
};

fccUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
};

window.onload = function() {
  fccUI.onload();

  fccUI.open(fcc_stream);

};

window.onunload = function() {};