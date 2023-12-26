export function showProgressBar(bruteProgress, length = 20, stepsToPrint = 100, index = 0){
    if(typeof globalThis['SPB_'+index] === 'undefined'){
        globalThis['SPB_'+index] = {
            lastRegisteredProgress: 0,
            bar: Array(length).fill(' '),
            steps: stepsToPrint/100,
            blockProgressValue: 100/length,
            blockProgressStep: (100/length)/9
        }
    }
    const SPB_ = globalThis['SPB_'+index]
    if(bruteProgress===1){
        const spacer = '   '
        SPB_.bar.fill('\u2588')
        process.stdout.write(SPB_.bar.join('')+' 100%'+spacer+'\r\n')
        delete globalThis['SPB_'+index]
        return
    }
    const progress = bruteProgress*100
    const stepProgress = Math.floor(progress*SPB_.steps)

    if(SPB_.lastRegisteredProgress === stepProgress){return}
    SPB_.lastRegisteredProgress = stepProgress

    const formattedProgress = progress.toFixed(1)
    const completedBlocks = Math.floor(progress/SPB_.blockProgressValue)
    const progressLeft = progress%SPB_.blockProgressValue
    const graphic = Math.floor(progressLeft/SPB_.blockProgressStep)
    let block = ''
    switch (graphic) {
        case 1: block = '\u258f'; break
        case 2: block = '\u258e'; break
        case 3: block = '\u258d'; break
        case 4: block = '\u258c'; break
        case 5: block = '\u258b'; break
        case 6: block = '\u258a'; break
        case 7: block = '\u2589'; break
        case 8: block = '\u2588'; break
        default: block = ' '; break
    }
    SPB_.bar.fill(' ')
    SPB_.bar.fill('\u2588', 0, completedBlocks)
    SPB_.bar[completedBlocks] = block
    process.stdout.write(SPB_.bar.join('')+' '+formattedProgress+'% '+'\r')
}
