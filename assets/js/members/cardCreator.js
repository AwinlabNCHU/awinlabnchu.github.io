// Escape form-supplied text before placing it in HTML attributes or content.
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function webLink(value) {
  const input = String(value ?? "").trim();
  const candidate = /^www\./i.test(input) ? "https://" + input : input;
  try {
    const url = new URL(candidate);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

// Member card creation functionality
export function createMemberCard(member, category) {
  member = { ...member };
  for (const field of ["SocialLink", "GithubLink", "blinks", "thesis"]) {
    member[field] = webLink(member[field]);
  }
  const avatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name)
    + "&background=ffff&rounded=true&size=200";
  const keywords = (member.keyword || [])
    .map((keyword) => '<span class="badge bg-secondary me-1">#' + escapeHtml(keyword) + '</span>')
    .join(" ");
  for (const field of ["name", "grade", "title", "description", "img", "email", "SocialLink", "GithubLink", "blinks", "thesis"]) {
    member[field] = escapeHtml(member[field]);
  }
  const memberDiv = document.createElement("div");
  memberDiv.classList.add(
    "member-item",
    `filter-${category}`,
    `filter-${member.degree || ""}`
  );


  memberDiv.innerHTML = `
    <div class="card shadow-sm">
      <div class="member-card-layout">
        <div class="member-photo">
          <img
            src="${
              member.img
                ? member.img
                : escapeHtml(avatar)
            }"
            class="card-img p-2"
            alt="${member.name}"
            loading="lazy"
          >
        </div>

        <div class="member-details">
          <div class="card-body">
            <h5 class="card-title">
              ${member.grade ? member.grade + "級 " : ""}
              ${
                member.thesis
                  ? `<a href="${member.thesis}">${member.name}</a>`
                  : member.name
              }
            </h5>

            ${
              member.title
                ? `<p class="card-text">${
                    category !== "studying"
                      ? "現職：" + member.title
                      : member.title
                  }</p>`
                : ""
            }

            <p class="card-text card-description d-none d-xl-block">
              ${member.description || ""}
            </p>

            ${
              keywords
                ? `<p class="mt-2 keyword d-none d-xl-block">${keywords}</p>`
                : ""
            }

            <div class="pt-2">
              ${
                member.SocialLink
                  ? `<a href="${member.SocialLink}" class="btn btn-light btn-sm me-1" title="Contact">
                    <i class="bi bi-person-lines-fill"></i>
                  </a>`
                  : ""
              }
              ${
                member.email
                  ? `<a href="mailto:${member.email}" class="btn btn-light btn-sm me-1" title="Email">
                    <i class="bi bi-envelope"></i>
                  </a>`
                  : ""
              }
              ${
                member.GithubLink
                  ? `<a href="${member.GithubLink}" class="btn btn-light btn-sm me-1" title="GitHub">
                    <i class="bi bi-github"></i>
                  </a>`
                  : ""
              }
              ${
                member.blinks
                  ? `<a href="${member.blinks}" class="btn btn-light btn-sm me-1" title="PersonalPage">
                    <i class="bi bi-link"></i>
                  </a>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return memberDiv;
}
