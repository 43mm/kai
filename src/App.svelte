<script lang="ts">
  import { Command } from "bits-ui";
  import type { Drop } from "./types";
  import "./app.css";

  let drops: Drop[] = $state([]);
  let input = $state("");

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
  <Command.Root class="flex flex-col w-full px-8">
    <Command.Input
      class="w-full rounded truncate bg-gray-100 px-8 py-6 text-3xl font-semibold placeholder:text-gray-300 focus:outline-none"
      placeholder="type to start..."
      bind:value={input}
    />
    {#if input}
      <Command.List
        class="border-2 border-gray-100 rounded max-h-80 bg-gray-100 overflow-y-auto overflow-x-hidden mt-4 py-4"
      >
        <Command.Viewport>
          <Command.Empty>No matches...</Command.Empty>
          {#each drops as drop (drop.id)}
            <Command.Item
              class="flex px-8 py-4 text-xl hover:bg-white cursor-pointer"
            >
              {drop.customTitle || drop.title || "(no title)"}
            </Command.Item>
          {/each}
        </Command.Viewport>
      </Command.List>
    {/if}
  </Command.Root>
  <section class="flex flex-wrap gap-4 p-4 mt-8">
    {#each drops as drop (drop.id)}
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
