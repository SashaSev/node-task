let array = [
    [1,2,3],
    [4,5,2],
    [4,5,6],

]

function matrix(arr){
    let center = Math.floor(arr.length/2);
    let newArray = [];
    newArray.push(
        arr[center].slice(0,center+1).reverse(),
        arr.map(a => a[0]).reverse().slice(center+1,arr.length -1),
        ...arr[0],
        arr.map(a => a.pop()).slice(1),
        ...arr[arr.length-1].reverse(),
        arr.map(a => a[0]).slice(center+1,arr.length-1).reverse()
    )
    return newArray.flat();
}

console.log(matrix(array))