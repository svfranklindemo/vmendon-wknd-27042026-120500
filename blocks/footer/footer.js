import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  //let footerPath = footerMeta.footer || '/footer';
  const locale = getMetadata('locale');
  const footerPath = locale ? `/${locale}/footer` : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  footer.classList.add('wrapper');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
