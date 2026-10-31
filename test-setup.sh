#!/bin/bash

echo "=========================================="
echo "PredNim Setup & Connectivity Test"
echo "=========================================="
echo

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Node.js version
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
  NODE_V=$(node -v)
  echo -e "${GREEN}✓${NC} Node.js installed: $NODE_V"
else
  echo -e "${RED}✗${NC} Node.js not found"
  exit 1
fi

# Test 2: npm packages
echo
echo "2. Checking npm packages..."
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules exists"
else
  echo -e "${RED}✗${NC} node_modules missing - run: npm install"
fi

# Test 3: Environment file
echo
echo "3. Checking environment variables..."
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✓${NC} .env.local exists"
  if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
    echo -e "${GREEN}✓${NC} NEXT_PUBLIC_SUPABASE_URL set"
  else
    echo -e "${RED}✗${NC} NEXT_PUBLIC_SUPABASE_URL not found"
  fi
else
  echo -e "${RED}✗${NC} .env.local missing"
fi

# Test 4: Internet connectivity
echo
echo "4. Checking internet connection..."
if ping -c 1 8.8.8.8 &> /dev/null; then
  echo -e "${GREEN}✓${NC} Internet connection OK"
else
  echo -e "${RED}✗${NC} No internet connection"
fi

# Test 5: DNS resolution
echo
echo "5. Checking DNS resolution..."
if host ozxvfqkwvsfzixdhzlod.supabase.co &> /dev/null; then
  echo -e "${GREEN}✓${NC} Supabase domain resolves"
else
  echo -e "${RED}✗${NC} Cannot resolve Supabase domain"
  echo "   Try: ping ozxvfqkwvsfzixdhzlod.supabase.co"
fi

# Test 6: Supabase connectivity
echo
echo "6. Testing Supabase HTTPS connection..."
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local 2>/dev/null | cut -d= -f2)
if [ ! -z "$SUPABASE_URL" ]; then
  if curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL" 2>/dev/null | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✓${NC} Supabase server is reachable"
  else
    echo -e "${RED}✗${NC} Supabase server not responding"
  fi
else
  echo -e "${RED}✗${NC} SUPABASE_URL not found in .env.local"
fi

# Test 7: Build test
echo
echo "7. Running production build test..."
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Production build passes"
else
  echo -e "${RED}✗${NC} Build failed - check logs"
fi

echo
echo "=========================================="
echo "Setup test complete!"
echo "=========================================="
echo
echo "Next step: npm run dev"
echo "Then open: http://localhost:3005"
