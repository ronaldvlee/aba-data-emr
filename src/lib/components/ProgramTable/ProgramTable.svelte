<script lang="ts">
    import { writable } from 'svelte/store';
    // import type { PageData } from './$types';
    
    // export let data: PageData;

    // TODO: Pass data from database into table
    let tableData = writable([
        [0, 0, 1, 3, 5, 2, 4, 3, 3, 2],
        [4, 5, 6, 8, 5, 6, 9, 10, 10, 12],
        [4, 5, 6, 8, 5, 6, 9, 10, 10, 12],
        [7, 10, 11, 11, 9, 10, 11, 11, 9, 10],
        [10, 9, 7, 5, 10, 10, 9, 11, 10, 8],
        [10, 9, 8, 8, 10, 9, 7, 8, 9, 8],
        [null, null, null, null, null, null, null, null, 10, 9]
    ]);

    $: maxTrials = 12;

    // Below: eslint says that it cannot handle null, it can handle null
    $: rowsTotal = $tableData.map(row => row.reduce((a, b) => a + (b !== null ? b : 0), 0)); // eslint-disable-line no-console
    $: totalTrials = $tableData.map(row => row.reduce((a, b) => a + (b !== null ? 1 : 0), 0) * maxTrials); // eslint-disable-line no-console

    $: sumTotalCorrect = rowsTotal.reduce((a, b) => a + b, 0); // eslint-disable-line no-console
    $: sumTotalTrials = $tableData.reduce((total, row) => total + row.reduce((a, b) => a + (b !== null ? 1 : 0), 0) * maxTrials, 0); // eslint-disable-line no-console
    $: percentageTotal = Math.floor(0.5 + 100 * sumTotalCorrect / sumTotalTrials); // eslint-disable-line no-console

    // Editing table data
    function handleCellChange(event: Event, rowIndex: number, cellIndex: number) {
        let target = event.target as HTMLElement
        if (!target) return

        let newValue = target.textContent;
        let newTableData = $tableData.map((row, i) => {
            if (i === rowIndex) {
                return row.map((cell, j) => {
                    if (j === cellIndex) 
                        return !isNaN(Number(newValue)) && newValue != "" ? Number(newValue) : null

                    return cell
                });
            }
            return row
        });
        
        tableData.set(newTableData);
    }

    // Key down handles pressing enter to go to next cell
    function handleKeyDown(event: KeyboardEvent) {
        let cell = event.target as HTMLElement

        if (event.key === 'Enter') {
            event.preventDefault();

            let next = cell.nextElementSibling as HTMLElement

            if (next) next.focus()
        }
    }
</script>

<div>
    <label for="maxTrials">Max Trials</label>
    <input id="maxTrials" type="number" bind:value={maxTrials}/>
</div>

<table class="table-auto border">
    <thead>
        <tr>
            <th class="px-4 py-2" colspan={$tableData[0].length}>Correct Trials</th>
            <th class="px-4 py-2">Total Correct</th>
            <th class="px-4 py-2">Total Trials</th>
        </tr>
    </thead>
    <tbody>
        {#each $tableData as row, i}
            <tr>
                {#each row as cell, j}
                    <td class="px-4 py-2 border"
                        contenteditable="true"
                        on:keydown={(event) => handleKeyDown(event)}
                        on:input={(event) => handleCellChange(event, i, j)}>{!cell && cell != 0 ? "" : cell}</td>
                {/each}
                <td class="px-4 py-2 border border-l-4">{rowsTotal[i]}</td>
                <td class="px-4 py-2 border">{totalTrials[i]}</td>
            </tr>
        {/each}

        <tr>
            <td colspan={$tableData[0].length}></td>
            <td class="px-4 py-2">{sumTotalCorrect}</td>
            <td class="px-4 py-2">{sumTotalTrials}</td>
            <td class="px-4 py-2 font-bold">{percentageTotal}%</td>
        </tr>
    </tbody>
</table>