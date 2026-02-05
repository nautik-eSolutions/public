<template>
    <AutoComplete
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge
        }"
    >
        <template #dropdownicon>
            <ChevronDownIcon />
        </template>
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </AutoComplete>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@primevue/icons/chevrondown';
import AutoComplete, { type AutoCompletePassThroughOptions, type AutoCompleteProps } from 'primevue/autocomplete';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ AutoCompleteProps {}
defineProps<Props>();

const theme = ref<AutoCompletePassThroughOptions>({
    root: `inline-flex w-full justify-center items-center align-middle p-fluid:flex`,
    pcInputText: {
        root: `appearance-none rounded-md outline-hidden 
            bg-white w-full h-full`
    },
    inputMultiple: `m-0 list-none cursor-text overflow-hidden flex items-center flex-wrap
        px-3 py-1 not-p-empty:px-1 gap-1 text-surface-700 bg-white`,
    chipItem: ``,
    pcChip: {
        root: `inline-flex items-center rounded-lg gap-2 px-3 py-1
            bg-surface-100 dark:bg-surface-800
            text-surface-800 dark:text-surface-0
            has-[img]:pt-1 has-[img]:pb-1
            p-focus:bg-surface-200 p-focus:text-surface-800 dark:p-focus:bg-surface-700 dark:p-focus:text-surface-0
            p-removable:pe-2`,
        image: `rounded-full w-8 h-8 -ms-2`,
        icon: `text-surface-800 dark:bg-surface-0 text-base w-4 h-4`,
        label: ``,
        removeIcon: `cursor-pointer text-base w-4 h-4 rounded-full
            text-surface-800 dark:text-surface-0
            focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary`
    },
    chipIcon: ``,
    inputChip: `flex-auto inline-flex py-1 max-w-30`,
    input: `border-none rounded-lg outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full text-inherit
        placeholder:text-surface-500 dark:placeholder:text-surface-400`,
    loader: `absolute top-1/2 -mt-2 end-3 p-has-dropdown:end-[3.25rem]`,
    dropdown: `cursor-pointer bg-white inline-flex items-center justify-center select-none overflow-hidden relative w-10 shrink-0 rounded-lg
        0`,
    dropdownIcon: ``,
    overlay: `bg-white p-portal-self:min-w-full absolute top-0 left-0 rounded-md
        bg-surface-0 dark:bg-surface-900

        text-surface-700 dark:text-surface-0
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    virtualScroller: ``,
    listContainer: `border-none mt-5 bg-white rounded-lg`,
    list: `m-0 p-2 bg-white rounded-lg list-none flex flex-col gap-[2px]`,
    optionGroup: `m-0 px-3 py-4 text-surface-500 dark:text-surface-400 font-semibold bg-transparent`,
    option: `cursor-pointer py-4 m-0 rounded-lg hover:bg-gray-100`,
    emptyMessage: `px-3 py-2`,
    searchResultMessage: ``,
    selectedMessage: ``,
    transition: {
        enterFromClass: 'opacity-0 scale-y-75',
        enterActiveClass: 'transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
});
</script>
