<script lang="ts">
  import { Command } from "bits-ui";
  import type { Drop, Collection } from "./types";
  import "./app.css";

  let drops: Drop[] = $state([]);
  let collections: Collection[] = $state([]);
  let input = $state("");

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
  <h1 class="text-9xl font-bold text-gray-50 mt-8">开 kāi</h1>
  <h3 class="text-3xl font-semibold -mt-4 -mb-3 ml-16 relative z-10">开 kāi</h3>
  <Command.Root class="root flex flex-col w-full px-8">
    <Command.Input
      class="w-full rounded truncate bg-gray-100 px-8 py-6 text-3xl font-semibold placeholder:text-gray-300 focus:outline-none"
      placeholder="type to start..."
      bind:value={input}
    />
    <Command.List class="max-h-80 overflow-y-auto overflow-x-hidden px-8 py-4">
      {#if input}
        <Command.Viewport>
          <Command.Item class="text-xl">add new link</Command.Item>
        </Command.Viewport>
      {/if}
    </Command.List>
  </Command.Root>
  <section class="flex flex-wrap gap-4 p-4 mt-8">
    <div class="flex flex-col items-center w-20">
      <button
        class="flex items-center justify-center bg-white w-8 h-8 rounded-full border-2 border-gray-800"
        onclick={createNewDrop}
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
          onfocus={selectContent}
        >
          {drop.customTitle || drop.title || "(no title)"}</span
        >
      </div>
    {/each}
  </section>
</div>
