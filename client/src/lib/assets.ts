// CDN image URLs for the project
export const IMAGES = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/hero-bg-Mb9vUWJsxfZFS6RtZhYWsY.webp",
  illusionLeft: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/illusion-left-GvUFM4E2emqDBuXEMbkzap.webp",
  realityRight: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/reality-right-6abSpmu8Fdma5nvEixVVaL.webp",
  teamBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/team-bg-ANdat9utznCmtZgbkJyhK6.webp",
  mobiusConcept: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/mobius-concept-QiobiNr4EnGqAyHZMVyPzk.webp",
  // Section 2 - Sim vs Real (single combined image)
  simVsReal: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450827855/cZmaTLLukNEGIhNB.png",
  // Section 2 - UMI comparison (single combined image)
  umiComparison: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450827855/vRUoAhyWvxaMjmEN.png",
  // Keep old separate images as fallback
  simScene: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/sim-scene-84xBy6QXHJZ3FCYxTsmYht.webp",
  realScene: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/real-scene-C7DLM3tA8KX5EXA8rNfjSc.webp",
  umiHuman: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/umi-human-8RDnQVS7HBiUoNzAYdxw3o.webp",
  umiRobot: "https://d2xsxph8kpxj0f.cloudfront.net/310519663450005821/a7aYbfDQQfjjYjxWVPwzho/umi-robot-SZmuEe6RoNhRFXUz3VtFd8.webp",
  // New AI-generated images - Sim vs Real & Proprioception
  simLabScene: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/nInuSlKBakKmulUm.png",
  realClutterScene: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/xAOqlSJHtbHIVUPZ.png",
  cottonGrasp: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/pEvfWScPMlzZrzME.png",
  stoneDrop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/ssFCsZOlprJDhCdq.png",
  // Job images for Offer section
  jobWarehouseCn: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/ACryqzXBmJSXvtIF.png",
  jobDeliveryCn: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/DGMMoafGSyJYyutv.png",
  jobLogisticsJp: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/OZYJvwWMlrFgssek.png",
  jobConvenienceJp: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/lHujvktsExZXeCQe.png",
  jobWarehouseUs: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/hoYUJXOCMrZzXPLa.png",
  jobGigUs: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450890229/wPwzOyTDuGiJtGIc.png",
} as const;

// Navigation items - 4-step narrative framework
export const NAV_ITEMS = [
  { id: "hero", label: "首页" },
  { id: "why-now", label: "为什么是现在" },
  { id: "how", label: "解决方案" },
  { id: "why-us", label: "为什么是我们" },
] as const;
