import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const HyphenQueryShortURLEndpoint = 'https://api.ayaka.io/hyphen/api/v1/url/short';
const TargetDomain = 'base.linlishi.xyz'; // 你的实际域名

interface HyphenResponse<T> {
  data: T;
}

interface HyphenQueryShortURLResponse {
  url: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { shortUrl } = req.query;

  if (!shortUrl || typeof shortUrl !== 'string') {
    return res.redirect(307, `https://${TargetDomain}/404`);
  }

  try {
    // 请求短链接服务，查询目标 URL
    const response = await fetch(`${HyphenQueryShortURLEndpoint}?url=${shortUrl}`);
    if (response.status === 404) {
      console.warn(`404: ${shortUrl}`);
      return res.redirect(307, `https://${TargetDomain}/404`);
    }

    const data = await response.json() as HyphenResponse<HyphenQueryShortURLResponse>;
    const targetUrl = data.data.url;

    if (!targetUrl || !targetUrl.startsWith('http')) {
      console.warn(`Invalid target URL: ${targetUrl}`);
      return res.redirect(307, `https://${TargetDomain}/404`);
    }

    // 重定向到目标 URL
    return res.redirect(307, targetUrl);
  } catch (error) {
    console.error('Error resolving short link:', error);
    return res.status(502).json({
      code: 502,
      message: 'Internal Server Error',
    });
  }
}
