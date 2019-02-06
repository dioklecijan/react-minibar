import React, { useState, useEffect, useRef } from 'react';

import './minibar.css';

/**
  @typedef TabProperty
  @type {Object}
  @property {string} label
  @property {string} [tooltip]
  @property {any} Any other custom property

  @typedef TabsProperties
  @type {Object}
  @property {Array<TabProperty>} tabs 
  @property {Array<{...TabProperty, index:number}> => mixed} onTabsChanged
  @property {number} [initialActiveTab=0]
  @property {Object} [style] - optional CSS styles for tab container.
 */

/**
 * Controlled tabs container.
 * @param {TabsProperties}
 */
export default function Tabs({
  tabs,
  onTabChanged,
  initialActiveTab = 0,
  style,
}) {
  // refs
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const thisElem = useRef(null);

  // state vars
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [menuPos, setMenuPos] = useState({ right: 0, top: 27 });
  const [visibleTabs, setVisibleTabs] = useState(() =>
    tabs.map((t, index) => ({ ...t, display: false, index }))
  );

  // effects
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  useEffect(() => updateTabs(), [activeTab]);

  useEffect(() => updateMenuPos());

  useEffect(() => {
    const onWindowResize = () => updateTabs();
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [visibleTabs]);

  // event handlers
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function onTabClick({ index, ...rest }) {
    setActiveTab(index);
    if (onTabChanged) onTabChanged({ index, ...rest });
  }

  // local helpers
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // recalculate tabs visibility and update visibleTabs state when changed
  function updateTabs() {
    if (!thisElem || !thisElem.current) return;
    const minibarEl = thisElem.current.parentElement;
    const minibarWidth = minibarEl.clientWidth;
    const menuWidth = getItemWidth('...');
    const vistabs = visibleTabs.map(t => ({ ...t, display: false }));
    const len = vistabs.length;
    let changed = false; // tabs visibility changed ?
    // enough space for active tab ?
    const activeTabWidth = getItemWidth(tabs[activeTab].label.toUpperCase());
    if (activeTabWidth < minibarWidth - menuWidth) {
      let prefixWidths = activeTabWidth;
      for (let idx = 0; idx < len; idx++) {
        if (idx === activeTab) vistabs[idx].display = true;
        else {
          const w = getItemWidth(tabs[idx].label.toUpperCase());
          if (prefixWidths + w < minibarWidth - menuWidth) {
            prefixWidths += w;
            vistabs[idx].display = true;
          } else {
            vistabs[idx].display = false;
          }
          // criteria to update: tab display prop
          if (!changed)
            changed = vistabs[idx].display !== visibleTabs[idx].display;
        }
      }
    } else {
      changed = visibleTabs.filter(t => t.display).length > 0;
    }
    if (changed) {
      setVisibleTabs(vistabs);
    }
  }

  // calculate new menu position and update menuPos state only
  // if it differs from existing one
  function updateMenuPos() {
    // menu content should bi right aligned with the minibar elem
    const sectionEl = thisElem.current;
    const minibarEl = thisElem.current.parentElement;
    const sectionRect = sectionEl.getBoundingClientRect();
    const minibarRect = minibarEl.getBoundingClientRect();
    const right = minibarRect.right - sectionRect.right;
    const top = minibarRect.top - sectionRect.top + sectionRect.height;
    if (menuPos.top !== top || menuPos.right !== right) {
      setMenuPos({ ...menuPos, top, right });
    }
  }

  // get text with for defined (current) font including paddings
  function getItemWidth(txt) {
    const font =
      '500 12px/27 "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif"';
    const padding = 22;
    return getTextWidth(txt, font) + padding;
  }

  // rendering parts
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function renderTabs() {
    return visibleTabs.map((t, idx) =>
      t.display ? (
        <TabItem
          onClick={event => onTabClick({ event, ...t })}
          key={t.label}
          active={activeTab === idx}
          title={t.tooltip || t.label}
          arial-label={t.tooltip || t.label}
          role="tab"
          tabIndex={idx}
        >
          {t.label}
        </TabItem>
      ) : null
    );
  }

  function renderMenu() {
    const hasMenu = visibleTabs.filter(t => t.display).length !== tabs.length;
    if (!hasMenu) return null;
    return (
      <TabMenu tabs={visibleTabs} onMenuItem={onTabClick} menuPos={menuPos} />
    );
  }

  // public
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function render() {
    return (
      <div className="section" style={style} ref={thisElem}>
        {renderTabs()}
        {renderMenu()}
      </div>
    );
  }

  return render();
}

// rendering single tab
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function TabItem({ children, active, ...rest }) {
  const classname = active ? 'item tab active' : 'item tab';
  return (
    <button className={classname} {...rest}>
      {children}
    </button>
  );
}

// rendering menu item
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function TabMenu({ tabs, onMenuItem, menuPos }) {
  const options = tabs
    .filter(t => t.display === false)
    .map(t => (
      <div
        key={t.label}
        value={t.label}
        className="menu-item"
        onClick={event => onMenuItem({ event, ...t })}
      >
        {t.label}
      </div>
    ));

  return (
    <div className="item tab menu">
      <span>...</span>
      <div
        className="menu-content"
        style={{ right: menuPos.right, top: menuPos.top }}
      >
        {options}
      </div>
    </div>
  );
}

// utility
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function getTextWidth(text, font) {
  // if given, use cached canvas for better performance
  // else, create new canvas
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
