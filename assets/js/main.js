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
  initTyped,
  initNavMenu,
  initNavMenuScrollspy,
  initHashScroll,
} from "./common/utils.js?v=2.1";
import { initHeader, initHeaderToggle } from "./common/header.js?v=2.1";

// Register each behavior once; member layout is managed by CSS Grid.
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initScrollTop();
  initAOS();
  initTyped();
  initNavMenu();
  initNavMenuScrollspy();
  initHashScroll();
  initHeader();
  initHeaderToggle();
});
