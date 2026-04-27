// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import { decorateFragment} from '../../blocks/fragment/fragment.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = `tabs-panel tabs-panel-${i}`;
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');

    if(block.classList.contains('with-fragment')){
      tabpanel.children[1].classList.add('fragment');
      decorateFragment(tabpanel.children[1]);
    }

    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);

  /*code for dropdown*/
    const tabs2 = document.querySelectorAll('.tabs-tab');
    const dropdown = document.createElement('select');
    dropdown.classList.add('dropdown');
  
    tabs2.forEach(tab => {
      const option = document.createElement('option');
      option.value = tab.id;
      option.textContent = tab.textContent;
      dropdown.appendChild(option);
    });
  
    dropdown.addEventListener('change', function() {
      const selectedTab = document.getElementById(this.value);
      selectedTab.click();

      // Remove 'selected' class from all options
    dropdown.querySelectorAll('option').forEach(option => {
      option.classList.remove('selected');
    });

    // Add 'selected' class to the selected option
    dropdown.querySelector(`option[value="${this.value}"]`).classList.add('selected');
    });
  
    document.querySelector('.tabs-list').parentNode.insertBefore(dropdown, document.querySelector('.tabs-list'));
  
}
