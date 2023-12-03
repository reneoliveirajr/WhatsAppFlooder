async function sendFlood(floodContent) {
    const lines = floodContent.split(/\n/).filter(line => line.trim() !== '');
    const main = document.querySelector("#main");
    const textarea = main.querySelector('div[contenteditable="true"]');
    if (!textarea) {
        throw new Error("There is no open conversation. Click to open the chat where you want to send the flood.");
    }

    const totalLines = lines.length;
    const startTime = Date.now();
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < totalLines; i++) {
        const line = lines[i].trim();
        textarea.focus();
        document.execCommand('insertText', false, line);
        await sleep(50);
        (main.querySelector('[data-testid="send"]') || main.querySelector('[data-icon="send"]')).click();

        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - startTime) / 1000;
        const remainingSeconds = ((totalLines - i - 1) * 125) / 1000;
        const percentComplete = ((i + 1) / totalLines) * 100;

        console.clear();
        console.log(`Sending message ${i + 1}/${totalLines}`);
        console.log(`Completion: ${percentComplete.toFixed(2)}%`);
        console.log(`Elapsed time: ${elapsedSeconds.toFixed(2)} seconds`);
        console.log(`Estimated remaining time: ${remainingSeconds.toFixed(2)} seconds`);

        await sleep(125);
    }

    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`Flood completed, ${totalLines} messages sent`);
    return totalLines;
}

sendFlood(`
# Your flood content below

# Line 1
# Line 2
# Line 3

`).catch(console.error);
