// Member statistics functionality
export function calculateMemberStats(data) {
  const alumni = data.alumni || [];
  const studying = data.studying || [];
  const allMembers = [...alumni, ...studying];
  return {
    totalMaster: allMembers.filter((member) => member.degree === "master").length,
    totalDoctor: allMembers.filter((member) => member.degree === "doctor").length,
    alumniMaster: alumni.filter((member) => member.degree === "master").length,
    alumniDoctor: alumni.filter((member) => member.degree === "doctor").length,
    currentDoctor: studying.filter((member) => member.degree === "doctor").length,
    currentMaster1: studying.filter((member) => member.degree === "master" && member.title === "碩一").length,
    currentMaster2: studying.filter((member) => member.degree === "master" && member.title === "碩二").length,
  };
}

export function animateCount(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentCount = Math.floor(progress * (end - start) + start);
    element.textContent = currentCount;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
