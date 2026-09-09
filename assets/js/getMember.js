import { calculateMemberStats, animateCount } from "./members/statistics.js?v=3.2.0-preview.1";
import { createMemberCard } from "./members/cardCreator.js?v=3.2.0-preview.1";
import { renderPaginationButtons } from "./members/pagination.js?v=3.2.0-preview.1";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("members-container");
  if (!container) return;

  try {
    const response = await fetch("assets/data/lab_members.json?v=3.2.0-preview.1");
    if (!response.ok) throw new Error("Member data: HTTP " + response.status);
    const data = await response.json();
    const stats = calculateMemberStats(data);
    document.querySelectorAll("[data-member-count]").forEach((element) => {
      animateCount(element, 0, stats[element.dataset.memberCount], 1000);
    });

    const membersPerPage = 8;
    const allMemberElements = Object.entries(data).flatMap(([category, members]) =>
      [...members]
        .sort((a, b) => (b.grade || 0) - (a.grade || 0))
        .map((member) => createMemberCard(member, category))
    );
    let currentFilter = ".filter-studying";

    function renderPage(pageIndex = 1) {
      const filtered = allMemberElements.filter((element) =>
        currentFilter === "*" || element.matches(currentFilter)
      );
      const totalPages = Math.ceil(filtered.length / membersPerPage);
      const page = Math.max(1, Math.min(pageIndex, totalPages || 1));
      const start = (page - 1) * membersPerPage;
      container.replaceChildren(...filtered.slice(start, start + membersPerPage));
      if (!filtered.length) container.textContent = "目前沒有符合條件的成員。";
      renderPaginationButtons(totalPages, page, renderPage);
    }

    const filterButtons = document.querySelectorAll(".member-filters [data-filter]");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((filterButton) => {
          const active = filterButton === button;
          filterButton.classList.toggle("filter-active", active);
          filterButton.setAttribute("aria-pressed", String(active));
        });
        currentFilter = button.dataset.filter;
        renderPage();
      });
    });

    renderPage();
  } catch (error) {
    console.error("Error loading members:", error);
    container.textContent = "成員資料暫時無法載入，請稍後重新整理頁面。";
    container.setAttribute("role", "alert");
  }
});
