// reff.js - Module untuk fungsi-fungsi utilitas

import fs from 'fs';
import axios from 'axios';
import { Wallet } from 'ethers';
import ora from 'ora';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import cfonts from 'cfonts';
import readline from 'readline';
import chalk from 'chalk';

// Fungsi utilitas umum
export function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

export function logToFile(message) {
  try {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('debug.log', `[${timestamp}] ${message}\n`, 'utf8');
  } catch (err) {
    console.error(chalk.red(`Failed to write to debug.log: ${err.message}`));
  }
}

export function centerText(text, color = "cyanBright") {
  const terminalWidth = process.stdout.columns || 80;
  const padding = Math.max(0, Math.floor((terminalWidth - text.length) / 2));
  return " ".repeat(padding) + chalk[color](text);
}

export function readProxiesFromFile(filename) {
  try {
    const content = fs.readFileSync(filename, 'utf8');
    return content.split('\n').map(line => line.trim()).filter(line => line !== '');
  } catch (err) {
    console.error(chalk.red("Gagal membaca file proxy.txt:", err.message));
    return [];
  }
}

export function shortAddress(address) {
  return `${address.slice(0, 8)}...${address.slice(-4)}`;
}

export function formatCountdown(ms) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Fungsi untuk menampilkan header
export function displayHeader() {
  cfonts.say("SOUIY", {
    font: "block",
    align: "center",
    colors: ["cyan", "magenta"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
  });
  
  console.log(centerText("=== TIKTOK 🚀 : AirdropRefferal (@souiy1) ==="));
  console.log(centerText("=== Satukan Solidaritas Bantu Palestina https://digital.dompetdhuafa.org/donasi/jagapalestina?gad_source=1&gad_campaignid=19753975814&gbraid=0AAAAADAhM1vRaR8mSktNHoNTW0ZytKlxb&gclid=Cj0KCQjwucDBBhDxARIsANqFdr2JxZgjGKTdpImD7icmr6UG3c6XnjjAKe83JIZeCR3MtFc64nHIscwaAg0UEALw_wcB Innalillahi! Lebih dari 50.983 syahid terbunuh, 70% korban anak-anak dan perempuan. Kuatkan solidaritas sekarang! ==="));
}

// Fungsi proxy
export async function setupProxy(axiosInstance) {
  let proxyUrl = null;
  let agent = null;

  const useProxy = await askQuestion(chalk.cyan("\nApakah Anda ingin menggunakan proxy? (Y/n): "));
  if (useProxy.toLowerCase() === 'y') {
    const proxies = readProxiesFromFile('proxy.txt');
    if (proxies.length > 0) {
      proxyUrl = proxies[0];
      if (proxyUrl.startsWith('http://') || proxyUrl.startsWith('https://')) {
        agent = new HttpsProxyAgent(proxyUrl);
      } else if (proxyUrl.startsWith('socks5://')) {
        agent = new SocksProxyAgent(proxyUrl);
      } else {
        console.log(chalk.red("Format proxy tidak dikenali. Harap gunakan http/https atau socks5."));
        return { axiosInstance, proxyUrl: null };
      }
      axiosInstance = axios.create({ httpAgent: agent, httpsAgent: agent });
      console.log(chalk.green(`Menggunakan proxy: ${proxyUrl}`));
    } else {
      console.log(chalk.red("File proxy.txt kosong atau tidak ditemukan. Melanjutkan tanpa proxy."));
    }
  } else {
    console.log(chalk.blue("Melanjutkan tanpa proxy."));
  }
  
  return { axiosInstance, proxyUrl };
}

// Fungsi countdown
export async function liveCountdown(durationMs) {
  const endTime = Date.now() + durationMs;
  return new Promise(resolve => {
    const timer = setInterval(() => {
      const remaining = Math.max(endTime - Date.now(), 0);
      process.stdout.write(chalk.yellow(`\rCycle berikutnya dalam ${formatCountdown(remaining)} ...`));
      if (remaining <= 0) {
        clearInterval(timer);
        process.stdout.write("\n");
        resolve();
      }
    }, 1000);
  });
}

// Fungsi request dengan retry
export async function requestWithRetry(fn, maxRetries = 30, delayMs = 2000, debug = false) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err) {
      if (err.response && err.response.status === 429) {
        attempt++;
        if (debug) console.warn(chalk.yellow(`Attempt ${attempt}: Received 429, retrying in ${delayMs}ms...`));
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        throw err;
      }
    }
  }
  throw new Error("Max retry attempts reached");
}

// Fungsi untuk membaca private keys
export function readPrivateKeysFromFile(filename) {
  try {
    const content = fs.readFileSync(filename, 'utf8');
    return content.split('\n').map(line => line.trim()).filter(line => line !== '');
  } catch (err) {
    console.error(chalk.red("Gagal membaca file .env:", err.message));
    process.exit(1);
  }
}

// Fungsi untuk validasi wallet
export function validateWallet(key) {
  try {
    new Wallet(key);
    return true;
  } catch {
    return false;
  }
}

// Ekspor semua fungsi yang diperlukan
export default {
  askQuestion,
  logToFile,
  centerText,
  readProxiesFromFile,
  shortAddress,
  formatCountdown,
  displayHeader,
  setupProxy,
  liveCountdown,
  requestWithRetry,
  readPrivateKeysFromFile,
  validateWallet,
  chalk,
  ora
};
