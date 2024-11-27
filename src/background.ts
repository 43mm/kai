import browser from "webextension-polyfill";

interface Bookmark {
  url: string;
  title: string;
  favicon: string;
}

// async function updateIcon(tabId: number, isBookmarked: boolean) {
//   const iconName = isBookmarked ? "bookmark" : "new";
//   await browser.action.setIcon({
//     tabId,
//     path: {
//       16: `icon/${iconName}16.png`,
//       32: `icon/${iconName}32.png`,
//       48: `icon/${iconName}48.png`,
//       128: `icon/${iconName}128.png`,
//     },
//   });
// }

// async function checkIfBookmarked(url: string): Promise<Bookmark | undefined> {
//   const { bookmarks = [] } = await browser.storage.local.get("bookmarks");
//   return bookmarks.find((bookmark: Bookmark) => bookmark.url === url);
// }

// browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete" && tab.url) {
//     const existingBookmark = await checkIfBookmarked(tab.url);
//     await updateIcon(tabId, !!existingBookmark);
//   }
// });

// browser.action.onClicked.addListener(async (tab) => {
//   if (!tab.url || !tab.title) return;

//   const { bookmarks = [] } = await browser.storage.local.get("bookmarks");
//   const existingBookmarkIndex = bookmarks.findIndex(
//     (bookmark: Bookmark) => bookmark.url === tab.url,
//   );

//   if (existingBookmarkIndex !== -1) {
//     // Update existing bookmark
//     bookmarks[existingBookmarkIndex] = {
//       url: tab.url,
//       title: tab.title,
//       favicon: tab.favIconUrl || "",
//     };
//     await browser.storage.local.set({ bookmarks });
//     browser.tabs.sendMessage(tab.id!, {
//       type: "SHOW_TOAST",
//       message: "Updated",
//     });
//   } else {
//     // Add new bookmark
//     const newBookmark = {
//       url: tab.url,
//       title: tab.title,
//       favicon: tab.favIconUrl || "",
//     };
//     bookmarks.push(newBookmark);
//     await browser.storage.local.set({ bookmarks });
//     browser.tabs.sendMessage(tab.id!, { type: "SHOW_TOAST", message: "Added" });
//   }

//   await updateIcon(tab.id!, true);
// });

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});
