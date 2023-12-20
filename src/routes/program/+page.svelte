<script lang="ts">
    import { writable } from 'svelte/store';
    import type { PageData } from './$types';
    
    // export let data: PageData;
    let tableData = writable([
        [0, 0, 1, 3, 5, 2, 4, 3, 3, 2],
        [4, 5, 6, 8, 5, 6, 9, 10, 10, 12],
        [4, 5, 6, 8, 5, 6, 9, 10, 10, 12],
        [7, 10, 11, 11, 9, 10, 11, 11, 9, 10],
        [10, 9, 7, 5, 10, 10, 9, 11, 10, 8],
        [10, 9, 8, 8, 10, 9, 7, 8, 9, 8]
    ]);

    $: rowsTotal = $tableData.map(row => row.reduce((a, b) => a + b, 0));

    function handleCellChange(event: Event, rowIndex: number, cellIndex: number) {
        let target = event.target as HTMLElement
        if (!target) return

        let newValue = target.textContent;
        let newTableData = $tableData.map((row, i) => 
            i === rowIndex ? row.map((cell, j) => j === cellIndex ? Number(newValue) : cell) : row
        );
        tableData.set(newTableData);
    }
</script>

<table class="table-auto w-full">
    <thead>
        <!-- <tr>
        {#each Object.keys($tableData[0]) as columnHeading}
            <th class="px-4 py-2 border">{columnHeading}</th>
        {/each}
        </tr> -->
    </thead>
    <tbody>
        {#each $tableData as row, i}
            <tr>
                {#each row as cell, j}
                    <td class="px-4 py-2 border"
                        contenteditable="true"
                        on:input={(event) => handleCellChange(event, i, j)}>{cell}</td>
                {/each}
                <td class="px-4 py-2 border border-l-4">{rowsTotal[i]}</td>
            </tr>
        {/each}
    </tbody>
</table>