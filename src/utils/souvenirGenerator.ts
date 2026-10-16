// Utility to generate a high-resolution, beautiful romantic Souvenir Certificate image via Canvas
export interface SouvenirData {
  coupleName: string;
  score: number;
  archetypeTitle: string;
  archetypeDesc: string;
  pillars: {
    comm: number;
    romance: number;
    conflict: number;
    future: number;
  };
  pillarLabels: {
    comm: string;
    romance: string;
    conflict: string;
    future: string;
  };
  dateStr: string;
  isFrench: boolean;
}

export const downloadSouvenirImage = (data: SouvenirData): Promise<void> => {
  return new Promise((resolve) => {
    // Create an offscreen canvas with high DPI 1080 x 1400 (ideal for social/mobile gallery)
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1420;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve();
      return;
    }

    // 1. Background Cream / Romantic Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#FFFBF7');
    bgGrad.addColorStop(0.5, '#FFF2F5');
    bgGrad.addColorStop(1, '#FFF8F2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Decorative Outer Border
    ctx.strokeStyle = '#FF6B8A';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Thin inner decorative gold/coral accent border
    ctx.strokeStyle = '#FFE4EC';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    // Corner decorative heart flourishes
    const drawCornerHeart = (x: number, y: number) => {
      ctx.save();
      ctx.fillStyle = '#FF6B8A';
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤', x, y);
      ctx.restore();
    };
    drawCornerHeart(48, 48);
    drawCornerHeart(width - 48, 48);
    drawCornerHeart(48, height - 48);
    drawCornerHeart(width - 48, height - 48);

    // 3. Header Ribbon & Brand
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FF6B8A';
    ctx.font = 'bold 22px Poppins, -apple-system, sans-serif';
    try {
      (ctx as any).letterSpacing = '3px';
    } catch {}
    ctx.fillText('L O V E Q U I Z', width / 2, 110);

    ctx.fillStyle = '#888888';
    ctx.font = '500 16px Poppins, sans-serif';
    try {
      (ctx as any).letterSpacing = '2px';
    } catch {}
    ctx.fillText(
      data.isFrench
        ? 'CERTIFICAT OFFICIEL D’ALCHIMIE & DE COMPATIBILITÉ'
        : 'OFFICIAL COUPLE HARMONY & COMPATIBILITY CERTIFICATE',
      width / 2,
      142
    );

    // 4. Couple Names Title
    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 44px Poppins, Georgia, serif';
    ctx.fillText(data.coupleName || (data.isFrench ? 'Camille & Thomas' : 'Camille & Thomas'), width / 2, 215);

    ctx.fillStyle = '#666666';
    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillText(
      data.isFrench ? 'Diagnostic de complicité relationnelle' : 'Relationship compatibility diagnostic',
      width / 2,
      250
    );

    // Divider Line
    ctx.strokeStyle = '#FFCCD5';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, 275);
    ctx.lineTo(width / 2 + 120, 275);
    ctx.stroke();

    // 5. Big Center Score Gauge Circle
    const circleX = width / 2;
    const circleY = 440;
    const radius = 125;

    // Background track circle
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#FFE4EC';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * data.score) / 100;
    ctx.arc(circleX, circleY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#FF6B8A';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score text inside circle
    ctx.fillStyle = '#FF6B8A';
    ctx.font = 'bold 74px Poppins, sans-serif';
    ctx.fillText(`${data.score}%`, circleX, circleY + 15);

    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 15px Poppins, sans-serif';
    ctx.fillText(data.isFrench ? 'ALCHIMIE GLOBALE' : 'GLOBAL CHEMISTRY', circleX, circleY + 52);

    // 6. Matched Archetype Box
    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 30px Poppins, sans-serif';
    ctx.fillText(data.archetypeTitle, width / 2, 630);

    ctx.fillStyle = '#555555';
    ctx.font = 'normal 17px Poppins, sans-serif';
    ctx.fillText(
      data.archetypeDesc.length > 90 ? data.archetypeDesc.slice(0, 90) + '...' : data.archetypeDesc,
      width / 2,
      665
    );

    // 7. 4 Pillars Visual Progress Bars Box
    const boxY = 720;
    const boxWidth = 760;
    const boxX = (width - boxWidth) / 2;

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FFE4EC';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, 380, 24);
    ctx.fill();
    ctx.stroke();

    // Box Header
    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 18px Poppins, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      data.isFrench ? 'ANALYSE DES 4 PILIERS DE VOTRE DUO' : 'THE 4 PILLARS OF YOUR BOND',
      boxX + 40,
      boxY + 45
    );

    // Pillars data
    const pillarsList = [
      { label: data.pillarLabels.comm, val: data.pillars.comm, icon: '💬' },
      { label: data.pillarLabels.romance, val: data.pillars.romance, icon: '💖' },
      { label: data.pillarLabels.conflict, val: data.pillars.conflict, icon: '🌿' },
      { label: data.pillarLabels.future, val: data.pillars.future, icon: '🌟' },
    ];

    pillarsList.forEach((pil, idx) => {
      const py = boxY + 85 + idx * 70;

      // Label & Value
      ctx.fillStyle = '#1A1A1A';
      ctx.font = '600 16px Poppins, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${pil.icon}  ${pil.label}`, boxX + 40, py + 14);

      ctx.fillStyle = '#FF6B8A';
      ctx.font = 'bold 17px Poppins, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${pil.val}%`, boxX + boxWidth - 40, py + 14);

      // Track Bar
      const barY = py + 26;
      const barWidth = boxWidth - 80;
      ctx.fillStyle = '#FFF0F3';
      ctx.beginPath();
      ctx.roundRect(boxX + 40, barY, barWidth, 12, 6);
      ctx.fill();

      // Fill Bar
      const fillW = Math.round((barWidth * pil.val) / 100);
      ctx.fillStyle = '#FF6B8A';
      ctx.beginPath();
      ctx.roundRect(boxX + 40, barY, fillW, 12, 6);
      ctx.fill();
    });

    // 8. Seal of Authenticity & Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#777777';
    ctx.font = 'italic 15px Georgia, serif';
    ctx.fillText(
      data.isFrench
        ? '« L’amour ne se mesure pas à l’absence de doutes, mais à la tendresse de chaque jour. »'
        : '« Love is not measured by the absence of doubts, but by daily tenderness. »',
      width / 2,
      1150
    );

    // Wax seal badge
    const sealX = width / 2;
    const sealY = 1240;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 46, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B8A';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px Poppins, sans-serif';
    ctx.fillText('LOVEQUIZ', sealX, sealY - 6);
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('VERIFIED', sealX, sealY + 14);

    // Date & Website URL
    ctx.fillStyle = '#888888';
    ctx.font = '500 13px Poppins, sans-serif';
    ctx.fillText(`${data.dateStr} · https://www.lovequiz.com`, width / 2, 1340);

    // Export to downloadable PNG
    const link = document.createElement('a');
    link.download = `LoveQuiz-Bilan-${(data.coupleName || 'Couple').replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    resolve();
  });
};
