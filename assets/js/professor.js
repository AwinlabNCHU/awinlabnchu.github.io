/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

import {
  initPreloader,
  initScrollTop,
  initAOS,
  initHashScroll,
} from "./common/utils.js";
import { initHeader } from "./common/header.js";

// Bootstrap manages this page's navbar; publications have their own module.
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initScrollTop();
  initAOS();
  initHashScroll();
  initHeader();
});
