const newArrayButton = document.getElementById("newArray");
const barsContainer = document.getElementById("barsContainer");
const bubbleSortButton = document.getElementById("bubbleSortButton");
const selectionSortButton = document.getElementById("selectionSortButton");
const insertionSortButton = document.getElementById("insertionSortButton");
const quickSortButton = document.getElementById("quickSortButton");
const mergeSortButton = document.getElementById("mergeSortButton");
const arrSizeInput = document.getElementById("arr_sz");
const speedInput = document.getElementById("speed");




function initializeSortingVisualizer() {
    document.addEventListener("DOMContentLoaded", function () {
        
        

        function generateRandomArray(length, minValue, maxValue) {
            const randomArray = [];
            for (let i = 0; i < length; i++) {
                const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
                randomArray.push(randomNumber);
            }
            return randomArray;
        }

        function createBars() {
            const arraySize = parseInt(arrSizeInput.value);
            const randomArray = generateRandomArray(arraySize, 10, 90);
            barsContainer.innerHTML = '';
        
            const barWidth = 100 / arraySize;
        
            for (let i = 0; i < arraySize; i++) {
                const bar = document.createElement("div");
                bar.className = "bar";
                bar.style.width = `${barWidth}%`;
                bar.style.borderColor = 'black';
                bar.style.borderWidth = '1px'; 
                bar.style.borderStyle = 'solid'; 
                bar.style.height = `${randomArray[i]}%`;
                bar.style.backgroundColor = '#FFDBAA';
                barsContainer.appendChild(bar);
            }
        }
        

        newArrayButton.addEventListener("click", function () {
            const randomArray = generateRandomArray(100, 10, 90);
            createBars(randomArray);
        });
       

        createBars(); 

        bubbleSortButton.addEventListener("click", async function () {
            console.log("Bubble Sort button clicked");
            const bars = barsContainer.querySelectorAll(".bar");
            const heights = Array.from(bars).map(bar => parseInt(bar.style.height));
        
            await bubbleSort(heights);
        });



        selectionSortButton.addEventListener("click", async function () {
            
            const bars = barsContainer.querySelectorAll(".bar");
            const heights = Array.from(bars).map(bar => parseInt(bar.style.height));
        
            await selectionSort(heights);
        
                
        });
        
        
        insertionSortButton.addEventListener("click", async function () {
            
            const bars = barsContainer.querySelectorAll(".bar");
            const heights = Array.from(bars).map(bar => parseInt(bar.style.height));
        
            await insertionSort(heights);
        
                
        });


        quickSortButton.addEventListener("click", async function () {
            console.log("Quick Sort button clicked");
            await sortBarsWithQuickSort();
        });
        
        

        mergeSortButton.addEventListener("click", async function () {
            console.log("Merge Sort button clicked");
            await sortBarsWithMergeSort();
        });


        arrSizeInput.addEventListener("input", createBars);


        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function mapSpeedToDelay(speed) {
            const minDelay = 1;     
            const maxDelay = 100;   
            const mappedDelay = minDelay + ((100 - speed) / 100) * (maxDelay - minDelay);
        
            return mappedDelay;
        }
        
        speedInput.addEventListener("input", function () {
            animationSpeed = mapSpeedToDelay(speedInput.value); 
        });
        let animationSpeed = mapSpeedToDelay(speedInput.value);


        function swapBars(bar1, bar2) {
            const tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;
        }
        
        async function bubbleSort(array, index = 0) {
            const n = array.length;
        
            if (index >= n - 1) {
                return;
            }
        
            for (let j = 0; j < n - index - 1; j++) {
                const bar1 = barsContainer.children[j];
                const bar2 = barsContainer.children[j + 1];
        
                bar1.style.backgroundColor = '#DFCCFB';
                bar2.style.backgroundColor = '#DFCCFB';
        
                await new Promise(resolve => setTimeout(resolve, animationSpeed)); 
        
        
                if (array[j] > array[j + 1]) {
                    swapBars(bar1, bar2);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
        
                bar1.style.backgroundColor = '#974EC3';
                bar2.style.backgroundColor = '#974EC3';
            }
        
            await bubbleSort(array, index + 1);
        }
        
        async function selectionSort(array) {
            const n = array.length;
        
            for (let i = 0; i < n - 1; i++) {
                let minIndex = i;
        
                for (let j = i + 1; j < n; j++) {
                    const bar1 = barsContainer.children[minIndex];
                    const bar2 = barsContainer.children[j];
        
                    bar1.style.backgroundColor = '#DFCCFB';
                    bar2.style.backgroundColor = '#DFCCFB';
        
                    await new Promise(resolve => setTimeout(resolve, animationSpeed)); 
        
        
        
                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
        
                    bar1.style.backgroundColor = '#FFDBAA';
                    bar2.style.backgroundColor = '#FFDBAA';
                }
        
                if (minIndex !== i) {
                    swapBars(barsContainer.children[i], barsContainer.children[minIndex]);
                    [array[i], array[minIndex]] = [array[minIndex], array[i]];
                }
        
                barsContainer.children[i+1].style.backgroundColor = '#974EC3';
            }
        }
        
        async function insertionSort(array) {
            const n = array.length;
        
            for (let i = 1; i < n; i++) {
                const key = array[i];
                let j = i - 1;
        
                while (j >= 0 && array[j] > key) {
                    array[j + 1] = array[j];
                    j--;
                }
        
                array[j + 1] = key;
                await updateBars(array, i);
        
                barsContainer.children[i].style.backgroundColor = '#FFDBAA';
            }
        
            for (let i = 0; i < n; i++) {
                barsContainer.children[i].style.backgroundColor = '#974EC3';
            }
        }
        
        async function updateBars(array, currentIndex) {
            const bars = barsContainer.children;
            for (let i = 0; i <= currentIndex; i++) {
                const bar = bars[i];
                bar.style.height = `${array[i]}%`;
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
        
            }
        }
        
        async function quickSort(array, left, right) {
            if (left < right) {
                const pivotIndex = await partition(array, left, right);
                await quickSort(array, left, pivotIndex - 1);
                await quickSort(array, pivotIndex + 1, right);
            }
        }
        
        async function partition(array, left, right) {
            const pivotValue = array[right];
            let pivotIndex = left - 1;
        
            for (let i = left; i < right; i++) {
                const currentBar = barsContainer.children[i];
                currentBar.style.backgroundColor = '#DFCCFB';
        
                if (array[i] < pivotValue) {
                    pivotIndex++;
                    swapBars(barsContainer.children[pivotIndex], barsContainer.children[i]);
                    [array[pivotIndex], array[i]] = [array[i], array[pivotIndex]];
                    await new Promise(resolve => setTimeout(resolve, animationSpeed)); 
        
                }
        
                currentBar.style.backgroundColor = '#FFDBAA';
            }
        
            swapBars(barsContainer.children[pivotIndex + 1], barsContainer.children[right]);
            [array[pivotIndex + 1], array[right]] = [array[right], array[pivotIndex + 1]];
        
            await new Promise(resolve => setTimeout(resolve, animationSpeed)); 
        
        
            for (let i = left; i <= right; i++) {
                barsContainer.children[i].style.backgroundColor = '#974EC3';
            }
        
            return pivotIndex + 1;
        }
        
        async function sortBarsWithQuickSort() {
            const bars = barsContainer.querySelectorAll(".bar");
            const heights = Array.from(bars).map(bar => parseInt(bar.style.height));
            
            await quickSort(heights, 0, heights.length - 1);
        
        }
        
        
        async function mergeSort(array, left, right) {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                await mergeSort(array, left, mid);
                await mergeSort(array, mid + 1, right);
                await merge(array, left, mid, right);
            }
        }
        
        async function merge(array, left, mid, right) {
            const n1 = mid - left + 1;
            const n2 = right - mid;
        
            const leftArray = array.slice(left, left + n1);
            const rightArray = array.slice(mid + 1, mid + 1 + n2);
        
            let i = 0, j = 0, k = left;
        
            while (i < n1 && j < n2) {
                const bar1 = barsContainer.children[left + i];
                const bar2 = barsContainer.children[mid + 1 + j];
        
                bar1.style.backgroundColor = '#DFCCFB';
                bar2.style.backgroundColor = '#DFCCFB';
        
                await new Promise(resolve => setTimeout(resolve, animationSpeed)); 
         
        
                if (leftArray[i] <= rightArray[j]) {
                    array[k] = leftArray[i];
                    barsContainer.children[k].style.height = `${array[k]}%`;
                    i++;
                } else {
                    array[k] = rightArray[j];
                    barsContainer.children[k].style.height = `${array[k]}%`;
                    j++;
                }
        
                k++;
        
                bar1.style.backgroundColor = '#974EC3';
                bar2.style.backgroundColor = '#974EC3';
            }
        
            while (i < n1) {
                array[k] = leftArray[i];
                barsContainer.children[k].style.height = `${array[k]}%`;
                i++;
                k++;
            }
        
            while (j < n2) {
                array[k] = rightArray[j];
                barsContainer.children[k].style.height = `${array[k]}%`;
                j++;
                k++;
            }
        }
        
        async function sortBarsWithMergeSort() {
            const bars = barsContainer.querySelectorAll(".bar");
            const heights = Array.from(bars).map(bar => parseInt(bar.style.height));
        
            await mergeSort(heights, 0, heights.length - 1);
        
        }
        
        
    });

}


initializeSortingVisualizer();




