<script lang="ts">
  import type { Drop, Collection } from "./types";

  let drops: Drop[] = $state([]);
  let collections: Collection[] = $state([]);

  let dropsWithoutCollection = $derived(
    drops.filter((d) => !d.collectionId).sort((a, b) => a.order - b.order),
  );

  function createNewDrop() {
    const newDrop: Drop = {
      id: crypto.randomUUID(),
      title: "",
      customTitle: "",
      url: "",
      order: drops.length,
      collectionId: null,
    };
    drops = [...drops, newDrop];
  }

  function createNewCollection() {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name: "",
      order: collections.length,
      isExpanded: true,
    };
    collections = [...collections, newCollection];
  }

  function selectContent(event: FocusEvent | MouseEvent) {
    const range = document.createRange();
    range.selectNodeContents(event.target as HTMLElement);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
</script>

<div>
  <h1 class="text-9xl text-gray-100 mt-4">开 kāi</h1>
  <section class="flex flex-wrap gap-4 p-4">
    <div class="flex flex-col items-center w-20">
      <button
        class="flex items-center justify-center bg-white w-8 h-8 rounded-full border-2 border-gray-800"
        on:click={createNewDrop}
      >
        <div class="text-xl">+</div>
      </button>
    </div>
    {#each dropsWithoutCollection as drop (drop.id)}
      <div class="flex flex-col gap-1 items-center w-20">
        <div class="w-8 h-8 rounded-full bg-sky-900"></div>
        <span
          class="text-sm"
          class:text-gray-400={!drop.title && !drop.customTitle}
          contenteditable
          on:focus={selectContent}
        >
          {drop.customTitle || drop.title || "(no title)"}</span
        >
      </div>
    {/each}
  </section>
</div>

<style global lang="postcss">
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
